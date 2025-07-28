// admin.js
export function setupAdmin() {
  // --- Data mẫu ban đầu ---
  let courses = [
    {
      id: 1,
      name: "Lập trình Java",
      desc: "Khóa học lập trình Java từ cơ bản đến nâng cao",
    },
    {
      id: 2,
      name: "Thiết kế web",
      desc: "Học cách tạo giao diện web đẹp, chuyên nghiệp",
    },
  ];

  let users = [
    { id: 1, username: "admin", email: "admin@example.com", role: "admin" },
    { id: 2, username: "user01", email: "user01@example.com", role: "user" },
  ];

  // --- DOM Elements ---
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  const modalCourse = document.getElementById("modal-course");
  const courseForm = document.getElementById("course-form");
  const courseIdInput = document.getElementById("course-id");
  const courseNameInput = document.getElementById("course-name");
  const courseDescInput = document.getElementById("course-desc");
  const courseModalTitle = document.getElementById("course-modal-title");
  const btnAddCourse = document.getElementById("btn-add-course");

  const modalUser = document.getElementById("modal-user");
  const userForm = document.getElementById("user-form");
  const userIdInput = document.getElementById("user-id");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const roleInput = document.getElementById("role");
  const userModalTitle = document.getElementById("user-modal-title");
  const btnAddUser = document.getElementById("btn-add-user");

  // --- Chuyển tab ---
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      tabContents.forEach((content) => (content.style.display = "none"));
      const targetId = tab.dataset.tab;
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.style.display = "block";
    });
  });

  // --- Render danh sách khóa học ---
  function renderCourses() {
    const tbody = document.getElementById("course-list");
    tbody.innerHTML = "";
    courses.forEach((course) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${course.id}</td>
        <td>${course.name}</td>
        <td>${course.desc}</td>
        <td>
          <button class="edit" data-id="${course.id}" data-type="course-edit">Sửa</button>
          <button class="delete" data-id="${course.id}" data-type="course-delete">Xóa</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // --- Render danh sách người dùng ---
  function renderUsers() {
    const tbody = document.getElementById("user-list");
    tbody.innerHTML = "";
    users.forEach((user) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button class="edit" data-id="${user.id}" data-type="user-edit">Sửa</button>
          <button class="delete" data-id="${user.id}" data-type="user-delete">Xóa</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // --- Xử lý mở modal thêm/sửa khóa học ---
  btnAddCourse.addEventListener("click", () => {
    courseForm.reset();
    courseIdInput.value = "";
    courseModalTitle.textContent = "Thêm khóa học";
    modalCourse.classList.add("active");
  });
  document
    .getElementById("close-course-modal")
    .addEventListener("click", () => {
      modalCourse.classList.remove("active");
    });
  document.getElementById("cancel-course-btn").addEventListener("click", () => {
    modalCourse.classList.remove("active");
  });

  // --- Xử lý lưu khóa học ---
  courseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = courseIdInput.value;
    const name = courseNameInput.value.trim();
    const desc = courseDescInput.value.trim();

    if (!name) {
      alert("Tên khóa học không được để trống");
      return;
    }

    if (id) {
      // Sửa khóa học
      const course = courses.find((c) => c.id == id);
      if (course) {
        course.name = name;
        course.desc = desc;
      }
    } else {
      // Thêm khóa học mới
      const newId = courses.length
        ? Math.max(...courses.map((c) => c.id)) + 1
        : 1;
      courses.push({ id: newId, name, desc });
    }

    renderCourses();
    modalCourse.classList.remove("active");
  });

  // --- Xử lý mở modal thêm/sửa người dùng ---
  btnAddUser.addEventListener("click", () => {
    userForm.reset();
    userIdInput.value = "";
    userModalTitle.textContent = "Thêm người dùng";
    modalUser.classList.add("active");
  });
  document.getElementById("close-user-modal").addEventListener("click", () => {
    modalUser.classList.remove("active");
  });
  document.getElementById("cancel-user-btn").addEventListener("click", () => {
    modalUser.classList.remove("active");
  });

  // --- Xử lý lưu người dùng ---
  userForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = userIdInput.value;
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const role = roleInput.value;

    if (!username) {
      alert("Tên đăng nhập không được để trống");
      return;
    }

    if (!email) {
      alert("Email không được để trống");
      return;
    }

    if (id) {
      // Sửa người dùng
      const user = users.find((u) => u.id == id);
      if (user) {
        user.username = username;
        user.email = email;
        user.role = role;
      }
    } else {
      // Thêm người dùng mới
      const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
      users.push({ id: newId, username, email, role });
    }

    renderUsers();
    modalUser.classList.remove("active");
  });

  // --- Event delegation xử lý sự kiện nút Sửa/Xóa khóa học ---
  document.getElementById("course-list").addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      const id = Number(target.dataset.id);
      const type = target.dataset.type;

      if (type === "course-edit") editCourse(id);
      else if (type === "course-delete") deleteCourse(id);
    }
  });

  // --- Event delegation xử lý sự kiện nút Sửa/Xóa người dùng ---
  document.getElementById("user-list").addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      const id = Number(target.dataset.id);
      const type = target.dataset.type;

      if (type === "user-edit") editUser(id);
      else if (type === "user-delete") deleteUser(id);
    }
  });

  // --- Hàm mở modal sửa khóa học ---
  function editCourse(id) {
    const course = courses.find((c) => c.id === id);
    if (!course) return;
    courseIdInput.value = course.id;
    courseNameInput.value = course.name;
    courseDescInput.value = course.desc;
    courseModalTitle.textContent = "Sửa khóa học";
    modalCourse.classList.add("active");
  }

  // --- Hàm xóa khóa học ---
  function deleteCourse(id) {
    if (confirm("Bạn có chắc muốn xóa khóa học này?")) {
      courses = courses.filter((c) => c.id !== id);
      renderCourses();
    }
  }

  // --- Hàm mở modal sửa người dùng ---
  function editUser(id) {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    userIdInput.value = user.id;
    usernameInput.value = user.username;
    emailInput.value = user.email;
    roleInput.value = user.role;
    userModalTitle.textContent = "Sửa người dùng";
    modalUser.classList.add("active");
  }

  // --- Hàm xóa người dùng ---
  function deleteUser(id) {
    if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
      users = users.filter((u) => u.id !== id);
      renderUsers();
    }
  }

  // --- Khởi tạo lần đầu ---
  renderCourses();
  renderUsers();
}
