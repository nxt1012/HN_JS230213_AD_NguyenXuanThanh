//rating selection
const votes = Array.from(document.getElementsByClassName("vote"));
let rating = 0;
let form = document.getElementById("form");
let review = "";
let reviewData = []

//reset all selection
function selectionReset() {
    rating = 0;
    votes.forEach(vote => {
        vote.setAttribute("style", "background-color: #f3f3f3; color: #000")
    })
}

votes.forEach(vote => {
    vote.addEventListener("click", function handleClick(event){
        selectionReset();
        rating = parseInt(vote.innerHTML);
        vote.setAttribute("style", "background-color: #ea5a87; color: #fff;")
    });
}

);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
})

let formValidation = () => {
    if (rating === 0){
        alert("Bạn phải cho điểm đánh giá!")
    } else {
        submitReview();
    }
}

function showReviews() {
//get data from localStorage
reviewData = JSON.parse(localStorage.getItem("reviewData"));
document.getElementsByClassName("reviews-counter")[0].innerHTML = reviewData.length + " Reviews";
let sum = 0;
for (let i = 0; i < reviewData.length; i++){
    sum += reviewData[i].rating;
}
console.log(sum/reviewData.length);
if (reviewData.length != 0) {
    document.getElementsByClassName("average-rating")[0].innerHTML = "Average Rating: "+ (sum/reviewData.length).toFixed(2);
} else {
    document.getElementsByClassName("average-rating")[0].innerHTML = "Average Rating";

}
let reviewList = "";
for (let i = reviewData.length-1; i >=0; i--){
    reviewList += `<div class="review">
    <div class="circle" id="no-${i}">${reviewData[i].rating}</div>
    <i onClick="editReview(this)" class="fa-solid fa-pen-to-square"></i>
    <i onClick="deleteReview(this)" class="fa-solid fa-xmark"></i>
    <p>This is feedback item ${i+1} coming from the backend</p>
</div>`;
}
document.getElementsByClassName("review-list")[0].innerHTML = reviewList;
}

function submitReview() {
    review = document.getElementById("reviewInput").value;
    let obj = {
        'rating': rating,
        'review': review

    }
    reviewData.push(obj);
    localStorage.setItem("reviewData", JSON.stringify(reviewData));
    selectionReset();
    document.getElementById("reviewInput").value = "";
    showReviews();
}

let editReview = (e) => {
    let composedId = e.previousSibling.previousSibling.id;
    let index = parseInt(composedId.substr(3));
    let newRating = prompt("Hãy đánh giá lại theo thang điểm số nguyên từ 1-10");
    let newReview = prompt("Hãy viết lại nhận xét mới");
    reviewData[index].rating = newRating;
    reviewData[index].review = newReview;
    localStorage.setItem("reviewData", JSON.stringify(reviewData));
    showReviews();
}

let deleteReview = (e) => {
    let composedId = e.previousSibling.previousSibling.id;
    let index = parseInt(composedId.substr(3));
    reviewData.splice(index, 1);
    localStorage.setItem("reviewData", JSON.stringify(reviewData));
    showReviews();

}

window.onload = () => {
    if (localStorage.hasOwnProperty("reviewData")){
        showReviews();
    }
};