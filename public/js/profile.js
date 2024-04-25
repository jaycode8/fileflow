const sessionToken = localStorage.getItem("filesharetoken");
const username = document.getElementById("uname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const profile_pic = document.getElementById("profile-pic");
const profile_preview = document.getElementById("profile_preview");
let selected_pic;
let user_id;

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
                user_id = data.user._id;
                username.value = data.user.username;
                email.value = data.user.email;
                if (data.user.profile_pic) {
                    profile_preview.src = `${data.user.profile_pic}`;
                }
            } else {
                return null;
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

const handleChange = (e) => {
    selected_pic = e.target.files[0];
    profile_preview.src = URL.createObjectURL(selected_pic);
}

const updateUser = async (e) => {
    e.preventDefault();
    try {
        let formData = new FormData();
        formData.append("username", username.value);
        formData.append("email", email.value);
        if (password.value != "") {
            formData.append("password", password.value);
        }
        if (selected_pic) {
            formData.append("profile_pic", selected_pic);
        }
        // let data = {
        //     username: username.value,
        //     email: email.value,
        // };
        // if (password.value != "") {
        //     data = { ...data, password: password.value };
        // }
        // if (selected_pic) {
        //     data = { ...data, profile_pic: selected_pic };
        // }

        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${sessionToken}`,
            },
            body: formData,
        };
        await fetch("/profile", options)
            .then((response) => response.json())
            .then((res) => {
                if (res.success === "true") {
                    location.reload(true);
                } else {
                    alert("An internal server error occurred");
                }
            })
            .catch((err) => {
                alert("An internal server error occurred");
            });
    } catch (e) {
        console.log(e);
    }
}

window.onload = fetchUser;

const toGallery = () => {
    window.location = `/gallery/${user_id}`;
}