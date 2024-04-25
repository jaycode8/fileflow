const tranfxn = (button) => {
    const galleries = document.querySelectorAll(".gallery");
    const glbtns = document.querySelectorAll(".glbtns");
    galleries.forEach((gallery) => {
        gallery.classList.add("hidden");
    });
    glbtns.forEach((btn) => {
        btn.classList.remove("active-btn");
    });
    for (let i = 0; i < glbtns.length; i++) {
        if (glbtns[i] === button) {
            galleries[i].classList.remove("hidden");
            glbtns[i].classList.add("active-btn");
            break;
        }
    }
};

const handleDelete = (id) => {
    const sessionToken = localStorage.getItem("filesharetoken");
    const options = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${sessionToken}`,
        },
    };
    fetch(`/file/${id}`, options)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.success === "true") {
                location.reload(true);
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

const toProfile = () => {
    location.href = "/profile"
}

const logOutfxn = () => {
    localStorage.removeItem("filesharetoken");
    location.href = "/"
};