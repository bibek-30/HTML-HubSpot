document.addEventListener("DOMContentLoaded", function() {
    const dragPoint = document.getElementById("dragPoint");
    const positionInput = document.getElementById("positionInput");
    const container = document.querySelector(".container");
    const imageUpload = document.getElementById("imageUpload");
    const imagePreview = document.getElementById("imagePreview");

    let isDragging = false;

    imageUpload.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    dragPoint.addEventListener("mousedown", function() {
        isDragging = true;
    });

    document.addEventListener("mouseup", function() {
        isDragging = false;
    });

    document.addEventListener("mousemove", function(event) {
        if (isDragging) {
            const rect = container.getBoundingClientRect();
            let left = (event.clientX - rect.left) / rect.width * 100;
            let top = (event.clientY - rect.top) / rect.height * 100;

            left = Math.max(0, Math.min(left, 100));
            top = Math.max(0, Math.min(top, 100));

            dragPoint.style.left = `${left}%`;
            dragPoint.style.top = `${top}%`;

            positionInput.value = `Left: ${left.toFixed(2)}%, Top: ${top.toFixed(2)}%`;
        }
    });
});
