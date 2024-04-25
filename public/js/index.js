const yearElement = document.getElementById("year");
const galleryBtn = document.getElementById("glLink");
const profileBtn = document.querySelector(".profile");
const profileDropdown = document.querySelector(".profile-dropdown");
const sessionToken = localStorage.getItem("filesharetoken");
let user;
const avatar_img = document.getElementById("avatar_img");

window.onload = () => {
    yearElement.innerHTML = new Date().getFullYear().toString();
    profileDropdown.style.display = "none";
};

profileBtn.onclick = () => toggleProfileDropdown();

const toggleProfileDropdown = () => {
    if (profileDropdown.style.display === "none") {
        profileDropdown.style.display = "block";
    } else {
        profileDropdown.style.display = "none";
    }
};

const fetchUser = () => {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionToken}`,
        },
    };
    fetch("/user", options)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.success === "true") {
                user = data.user;
                if (data.user.profile_pic) {
                    avatar_img.src = `${data.user.profile_pic}`;
                }
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

galleryBtn.onclick = async () => {
    if (sessionToken) {
        await fetchUser();
        window.location = `/gallery/${user._id}`;
    } else {
        let res = confirm("To view gallery you need to be logged in");
        if (res) {
            location.href = "/forms";
        }
    }
};

const checkToken = async () => {
    const btns = document.querySelectorAll(".profile-dropdown-btn");
    btns.forEach(btn => {
        btn.classList.add("bamako");
    })
    if (sessionToken) {
        await fetchUser();
        const pbtns = document.querySelectorAll(".profile-dropdown p");
        pbtns.forEach((btn) => {
            btn.classList.remove("bamako");
        });
    } else {
        document.querySelector(".profile-dropdown a").classList.remove("bamako");
    }
};

const logOut = () => {
    localStorage.removeItem("filesharetoken");
    location.reload(true)
};

document.addEventListener("DOMContentLoaded", checkToken);

const userProfile = () => {
    location.href = "/profile";
}
