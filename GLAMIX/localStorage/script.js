// --- ฟังก์ชันสมัครสมาชิก (Registration) ---
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('regUsername').value.trim();
        const password = document.getElementById('regPassword').value.trim();
        const messageElement = document.getElementById('regMessage');

        if (username === "" || password === "") {
            messageElement.textContent = "กรุณากรอกข้อมูลให้ครบถ้วน";
            messageElement.style.color = "red";
            return;
        }

        // ตรวจสอบว่าชื่อผู้ใช้ซ้ำหรือไม่
        if (localStorage.getItem(username)) {
            messageElement.textContent = `ชื่อผู้ใช้ "${username}" มีผู้ใช้แล้ว กรุณาใช้ชื่ออื่น`;
            messageElement.style.color = "red";
            return;
        }

        // บันทึกข้อมูล (ใช้ localStorage.setItem)
        const userData = { username: username, password: password };
        localStorage.setItem(username, JSON.stringify(userData));

        messageElement.textContent = `✅ สมัครสมาชิกสำเร็จ! กำลังนำไปหน้าเข้าสู่ระบบ...`;
        messageElement.style.color = "green";
        
        // ล้างฟอร์ม
        document.getElementById('regUsername').value = '';
        document.getElementById('regPassword').value = '';
        
        // **เปลี่ยนไปหน้า Login หลังจากสมัครสำเร็จ**
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500); 
    });
}

// --- ฟังก์ชันเข้าสู่ระบบ (Login) ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const logUsername = document.getElementById('logUsername').value.trim();
        const logPassword = document.getElementById('logPassword').value.trim();
        const messageElement = document.getElementById('logMessage');

        if (logUsername === "" || logPassword === "") {
            messageElement.textContent = "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน";
            messageElement.style.color = "red";
            return;
        }

        // ดึงข้อมูลที่เก็บไว้จาก localStorage
        const storedUserString = localStorage.getItem(logUsername);

        if (storedUserString) {
            // พบข้อมูล
            const storedUser = JSON.parse(storedUserString);

            // ตรวจสอบรหัสผ่าน
            if (storedUser.password === logPassword) {
                // เข้าสู่ระบบสำเร็จ
                messageElement.textContent = "✅ เข้าสู่ระบบสำเร็จ! กำลังนำไปหน้าเว็บไซต์...";
                messageElement.style.color = "green";
                
                // **เปลี่ยนเส้นทางไปยังหน้าเว็บไซต์หลัก**
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);

            } else {
                // รหัสผ่านไม่ถูกต้อง
                messageElement.textContent = "❌ รหัสผ่านไม่ถูกต้อง";
                messageElement.style.color = "red";
            }
        } else {
            // ไม่พบชื่อผู้ใช้
            messageElement.textContent = `❌ ไม่พบชื่อผู้ใช้ "${logUsername}" กรุณาสมัครสมาชิกก่อน`;
            messageElement.style.color = "red";
        }
    });
}

// ... โค้ด Register และ Login เดิม ...

function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const authStatusElement = document.getElementById('authStatus');
    const accountLink = document.getElementById('accountLink');
    
    // ----------------------------------------------------------------
    // ✅ เพิ่ม: ตรวจสอบสถานะและ Redirect หากผู้ใช้ล็อกอินอยู่แล้ว
    // ----------------------------------------------------------------
    
    // ตรวจสอบเฉพาะหน้า Login เพื่อพาผู้ใช้ที่ล็อกอินแล้วไปหน้าหลักทันที
    if (document.title.includes('เข้าสู่ระบบ') && loggedInUser) {
        // ถ้าล็อกอินอยู่ และเข้าหน้า Login ให้เปลี่ยนไปหน้าหลักทันที
        window.location.href = 'index.html';
        return; 
    }
    
    // ----------------------------------------------------------------
    // ตรวจสอบสถานะสำหรับหน้า index.html (ส่วนนี้ยังคงใช้ชื่อผู้ใช้)
    // ----------------------------------------------------------------
    if (authStatusElement) {
        if (loggedInUser) {
            authStatusElement.innerHTML = `
                <span class="user-greeting">สวัสดี, ${loggedInUser}</span>
                <button onclick="logout()">ออกจากระบบ</button>
            `;
            if(accountLink) {
                 accountLink.href = 'dashboard.html';
            }
        } else {
            authStatusElement.innerHTML = `
                <a href="login.html">เข้าสู่ระบบ</a>
                <a href="register.html">สมัครสมาชิก</a>
            `;
            if(accountLink) {
                accountLink.href = 'login.html';
            }
        }
    }

}

// เรียกฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
window.onload = checkLoginStatus;


// ... โค้ด checkLoginStatus เดิม ...
// เรียกฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
window.onload = checkLoginStatus;


// --- ฟังก์ชันออกจากระบบ (Logout) ---
function logout() {
    // 1. ลบสถานะการล็อกอินออกจาก localStorage
    localStorage.removeItem('loggedInUser');

    // 2. เปลี่ยนเส้นทางกลับไปหน้า Login
    window.location.href = 'login.html';
}