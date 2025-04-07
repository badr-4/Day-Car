document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('show');
            }
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
    }
    
    prevBtn.addEventListener('click', function() {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonials.length - 1;
        }
        showTestimonial(currentTestimonial);
    });
    
    nextBtn.addEventListener('click', function() {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    });
    
    // Auto-rotate testimonials
    setInterval(function() {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Reservation Form Handling
    const reservationForm = document.getElementById('reservation-form');
    const availabilityResults = document.getElementById('availability-results');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const pickupLocation = document.getElementById('pickup-location').value;
            const dropoffLocation = document.getElementById('dropoff-location').value;
            const pickupDate = document.getElementById('pickup-date').value;
            const pickupTime = document.getElementById('pickup-time').value;
            const dropoffDate = document.getElementById('dropoff-date').value;
            const dropoffTime = document.getElementById('dropoff-time').value;
            const carType = document.getElementById('car-type').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll simulate a response
            
            // Simulate API call delay
            setTimeout(function() {
                // Display availability results
                availabilityResults.innerHTML = `
                    <div class="available-car">
                        <h3>Available ${carType} Cars</h3>
                        <div class="car-options">
                            <div class="car-option">
                                <h4>${carType === 'economy' ? 'Toyota Corolla' : 
                                    carType === 'suv' ? 'Honda CR-V' : 
                                    carType === 'luxury' ? 'BMW 5 Series' : 
                                    carType === 'minivan' ? 'Chrysler Pacifica' : 
                                    'Ford Mustang'}</h4>
                                <p>${carType === 'economy' ? 'Compact and fuel-efficient' : 
                                    carType === 'suv' ? 'Spacious and comfortable' : 
                                    carType === 'luxury' ? 'Premium luxury experience' : 
                                    carType === 'minivan' ? 'Perfect for large groups' : 
                                    'Sporty and fun to drive'}</p>
                                <p class="price">$${carType === 'economy' ? '35' : 
                                    carType === 'suv' ? '65' : 
                                    carType === 'luxury' ? '120' : 
                                    carType === 'minivan' ? '80' : 
                                    '90'} per day</p>
                                <button class="btn book-btn" data-car="${carType}">Book Now</button>
                            </div>
                        </div>
                    </div>
                `;
                
                availabilityResults.style.display = 'block';
                
                // Scroll to results
                availabilityResults.scrollIntoView({ behavior: 'smooth' });
                
                // Add event listener to book button
                document.querySelector('.book-btn')?.addEventListener('click', function() {
                    alert(`Booking confirmed for ${this.getAttribute('data-car')} car!`);
                });
            }, 1000);
        });
    }
    
    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show an alert
            alert(`Thank you for your message, ${name}! We'll get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter Form Handling
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input').value;
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show an alert
            alert(`Thank you for subscribing with ${email}!`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Set minimum date for pickup to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('pickup-date').min = today;
    
    // Update dropoff date minimum based on pickup date
    document.getElementById('pickup-date').addEventListener('change', function() {
        document.getElementById('dropoff-date').min = this.value;
    });
});