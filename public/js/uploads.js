let selectedFile;

const toggleUploadModal = () => {
    if (localStorage.getItem("filesharetoken")) {
        const uploadModal = document.querySelector(".upload-modal");
        if (uploadModal.classList.contains("active")) {
            uploadModal.classList.remove("active");
        } else if (!uploadModal.classList.contains("active")) {
            uploadModal.classList.add("active");
        }
    } else {
        let res = confirm("To upload a file you need to be logged in");
        if (res) {
            location.href = "/forms";
        }
    }
};
const toggleButtons = (button) => {
    const buttons = document.querySelectorAll(".action-btns button");
    const forms = document.querySelectorAll(".upload-modal form");
    buttons.forEach((btn) => {
        btn.classList.remove("active");
    });
    forms.forEach((form) => {
        form.classList.add("inactive");
    });
    button.classList.add("active");
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i] === button) {
            forms[i].classList.remove("inactive");
            break;
        }
    }
};

const handleFileChange = (event) => {
    selectedFile = event.target.files[0];
    const img = document.getElementById("photo");
    const chooseLabel = document.getElementById("choose_label");
    const imageFileNameEl = document.querySelector(".image-file-name");
    img.src = URL.createObjectURL(selectedFile);
    imageFileNameEl.innerHTML = `Chosen file: ${selectedFile.name}`;
    chooseLabel.innerHTML = "Click here to choose a different image file";
};

const handleVideoChange = (event) => {
    selectedFile = event.target.files[0];
    const fileSize = selectedFile.size / (1024 * 1024);
    if (fileSize > 10) {
        alert("Accepted videos are upto 10mbs");
    } else {
        const videoPlayer = document.getElementById("videoPlayer");
        const videoLabel = document.getElementById("video_label");
        const videoFileName = document.querySelector(".video-file-name");
        videoPlayer.src = URL.createObjectURL(selectedFile);
        videoFileName.innerHTML = `Chosen file: ${selectedFile.name}`;
        videoLabel.innerHTML = "Click here to choose a different video";
    }
};

const handleDocumentChange = (event) => {
    selectedFile = event.target.files[0];
    const fileSize = selectedFile.size / (1024 * 1024);
    if (fileSize > 10) {
        alert("Document files exceeding 20mbs are not uploadable");
    } else {
        const docLabel = document.getElementById("doc_label");
        const docFileName = document.querySelector(".doc-file-name");
        docFileName.innerHTML = `Chosen file: ${selectedFile.name}`;
        docLabel.innerHTML = "Click here to choose a different document";
    }
};

const fileUpload = (event) => {
    event.preventDefault();
    const sessionToken = localStorage.getItem("filesharetoken");
    if (selectedFile) {
        if (sessionToken) {
            const formData = new FormData();
            formData.append("myFile", selectedFile);
            fetch("/file", {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${sessionToken}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success === "true") {
                        location.href = `/gallery/${data.user}`;
                    } else {
                        console.log(data)
                        alert("An internal server error occurred");
                    }
                })
                .catch((err) => {
                    console.log(err)
                    alert("An internal server error occurred");
                });
        } else {
            let res = confirm("You need to be logged in to post a file.");
            if (res) {
                location.href = "/forms";
            }
        }
    } else {
        alert("No file selected");
    }
};
