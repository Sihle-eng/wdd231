document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("membership-form");
    const timestampField = document.getElementById("timestamp");

    form.addEventListener("submit", function () {
        timestampField.value = new Date().toISOString();
    });
});
