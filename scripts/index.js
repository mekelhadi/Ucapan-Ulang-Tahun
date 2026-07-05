document.getElementById("birthdayForm").addEventListener("submit", function (e) {
  e.preventDefault();
  submitForm();
});

document.getElementById("photo").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      document.querySelector("#photoPreview img").src = event.target.result;
      document.getElementById("photoPreview").style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});


function submitForm() {
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const photoFile = document.getElementById("photo").files[0];
  const previewImg = document.querySelector("#photoPreview img");

  if (!name) {
    Swal.fire({ icon: "warning", title: "Namanya belum diisi!", text: "Isi dulu nama kamu ya 😊", confirmButtonColor: "#764ba2", confirmButtonText: "Oke" });
    return;
  }
  if (!age || parseInt(age) < 1 || parseInt(age) > 150) {
    Swal.fire({ icon: "warning", title: "Umurnya belum diisi!", text: "Isi umur kamu dengan benar ya 🎂", confirmButtonColor: "#764ba2", confirmButtonText: "Oke" });
    return;
  }
  if (!photoFile && !previewImg.src) {
    Swal.fire({ icon: "warning", title: "Belum upload foto!", text: "Upload dulu foto kamu ya 📸", confirmButtonColor: "#764ba2", confirmButtonText: "Oke" });
    return;
  }

  const photo = previewImg.src || "./img/fotoku.jpg";

  document.getElementById("inputSection").style.display = "none";
  document.getElementById("birthdaySection").style.display = "block";

  startBirthday(name, age, photo);
}

document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined") return;

  const tl = gsap.timeline();
  tl.from(".birthday-card", { opacity: 0, y: 60, scale: 0.9, duration: 0.8, ease: "power3.out" })
    .from(".card-header h1", { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
    .from(".card-header p", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
    .from(".input-group", { opacity: 0, y: 20, duration: 0.5, stagger: 0.15 }, "-=0.2");

  gsap.to(".balloon", { y: -30, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 0.3 });
});
