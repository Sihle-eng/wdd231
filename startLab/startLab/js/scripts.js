const openButton = document.querySelector("#openButton");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");
const dialogBoxText = document.querySelector("#dialogBox div");

openButton1.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One apple conatins 98 calories`
});

openButton2.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One banana conatins 398 calories`
});
openButton3.addEventListener("click", () => {
    dialogBox.showModal();
    dialogBoxText.innerHTML = `One mango conatins 198 calories`
});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});