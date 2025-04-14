// Tunggu sampai DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk menampilkan pesan selamat datang
    function showWelcomeMessage() {
        const currentHour = new Date().getHours();
        let greeting;
        
        if (currentHour < 12) {
            greeting = "Selamat Pagi";
        } else if (currentHour < 15) {
            greeting = "Selamat Siang";
        } else if (currentHour < 19) {
            greeting = "Selamat Sore";
        } else {
            greeting = "Selamat Malam";
        }
        
        const welcomeMessage = `${greeting}, Selamat datang di Website Sederhana kami!`;
        
        // Cek apakah elemen alert sudah ada
        const existingAlert = document.querySelector('.welcome-alert');
        if (!existingAlert) {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'welcome-alert';
            alertDiv.style.backgroundColor = '#e8491d';
            alertDiv.style.color = 'white';
            alertDiv.style.padding = '10px';
            alertDiv.style.textAlign = 'center';
            alertDiv.style.marginBottom = '20px';
            alertDiv.style.borderRadius = '5px';
            alertDiv.style.position = 'relative';
            
            const closeBtn = document.createElement('span');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.position = 'absolute';
            closeBtn.style.right = '10px';
            closeBtn.style.top = '5px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.fontSize = '20px';
            
            closeBtn.addEventListener('click', function() {
                alertDiv.style.display = 'none';
            });
            
            alertDiv.textContent = welcomeMessage;
            alertDiv.appendChild(closeBtn);
            
            const header = document.querySelector('header');
            header.parentNode.insertBefore(alertDiv, header.nextSibling);
        }
    }

    // Panggil fungsi selamat datang
    showWelcomeMessage();
    
    // Validasi form
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const nama = document.getElementById('nama').value;
            const email = document.getElementById('email').value;
            const pesan = document.getElementById('pesan').value;
            
            let isValid = true;
            let errorMessage = '';
            
            // Validasi nama
            if (nama.trim() === '') {
                errorMessage += 'Nama harus diisi.\n';
                isValid = false;
            }
            
            // Validasi email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errorMessage += 'Email tidak valid.\n';
                isValid = false;
            }
            
            // Validasi pesan
            if (pesan.trim() === '') {
                errorMessage += 'Pesan harus diisi.\n';
                isValid = false;
            } else if (pesan.length < 10) {
                errorMessage += 'Pesan minimal 10 karakter.\n';
                isValid = false;
            }
            
            if (isValid) {
                // Simulasi pengiriman data
                showThankYouMessage(nama);
                contactForm.reset();
            } else {
                alert('Terdapat kesalahan pada form:\n' + errorMessage);
            }
        });
    }
    
    // Fungsi untuk menampilkan pesan terima kasih
    function showThankYouMessage(nama) {
        const thankYouDiv = document.createElement('div');
        thankYouDiv.style.backgroundColor = '#4CAF50';
        thankYouDiv.style.color = 'white';
        thankYouDiv.style.padding = '15px';
        thankYouDiv.style.borderRadius = '5px';
        thankYouDiv.style.marginTop = '20px';
        thankYouDiv.textContent = `Terima kasih, ${nama}! Pesan Anda telah kami terima. Kami akan segera menghubungi Anda.`;
        
        const contactSection = document.getElementById('kontak');
        contactSection.appendChild(thankYouDiv);
        
        // Hapus pesan setelah 5 detik
        setTimeout(function() {
            thankYouDiv.style.opacity = '0';
            thankYouDiv.style.transition = 'opacity 1s';
            
            setTimeout(function() {
                contactSection.removeChild(thankYouDiv);
            }, 1000);
        }, 5000);
    }
    
    // Smooth scrolling untuk navigasi
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Dapatkan id target dari href
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                event.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efek highlight pada bagian yang sedang dilihat
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + id) {
                        link.style.color = '#e8491d';
                    }
                });
            }
        });
    });
});
