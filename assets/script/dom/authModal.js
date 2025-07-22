export function setupAuthModal(
  authBtnId,
  modalId,
  closeBtnId,
  loginFormId,
  registerFormId,
  titleId,
  showRegisterId,
  showLoginId
) {
  const authBtn = document.getElementById(authBtnId);
  const modal = document.getElementById(modalId);
  const closeBtn = document.getElementById(closeBtnId);
  const loginForm = document.getElementById(loginFormId);
  const registerForm = document.getElementById(registerFormId);
  const modalTitle = document.getElementById(titleId);
  const showRegister = document.getElementById(showRegisterId);
  const showLogin = document.getElementById(showLoginId);

  if (
    !authBtn ||
    !modal ||
    !closeBtn ||
    !loginForm ||
    !registerForm ||
    !modalTitle ||
    !showRegister ||
    !showLogin
  ) {
    console.warn("Thiếu phần tử trong authModal");
    return;
  }

  function showLoginForm() {
    modalTitle.textContent = "Đăng nhập";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    showRegister.style.display = "inline";
    showLogin.style.display = "none";
    modal.style.display = "flex";
  }

  function showRegisterForm() {
    modalTitle.textContent = "Đăng ký";
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    showRegister.style.display = "none";
    showLogin.style.display = "inline";
    modal.style.display = "flex";
  }

  authBtn.addEventListener("click", showLoginForm);

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    showRegisterForm();
  });

  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    showLoginForm();
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // ✅ Xử lý thông báo sau khi redirect từ PHP
  const params = new URLSearchParams(window.location.search);

  if (params.get("registered") === "1") {
    showLoginForm();
    console.log("🟢 Đăng ký thành công! Vui lòng đăng nhập.");
  }

  if (params.get("login") === "success") {
    console.log("🟢 Đăng nhập thành công!");
  }

  if (params.get("login") === "fail") {
    showLoginForm();
    console.warn(
      "❌ Đăng nhập thất bại. Vui lòng kiểm tra tài khoản hoặc mật khẩu."
    );
  }

  // ✅ Xoá query trên URL để khi reload không hiện lại
  if (params.get("registered") || params.get("login")) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}
