document.addEventListener('DOMContentLoaded', () => {
    // Simple fade-in animation for elements with the .fade-in class
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`; // Stagger animation
    });

    // Add .fade-in class to sections for demonstration if not already present
    // This is a generic way to apply to main sections.
    // Specific elements can have 'fade-in' class in HTML for more control.
    const sectionsToAnimate = document.querySelectorAll('main > section');
    sectionsToAnimate.forEach(section => {
        section.classList.add('fade-in');
    });

    // Smooth scroll for anchor links (optional, but good for single-page navigation feel)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
// Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const body = document.body; // Or a more specific parent like header

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            // This will toggle the class on the <body> or a specific header element
            // The CSS uses .nav-open on the <body> (or header) to show the .nav-wrapper
            body.classList.toggle('nav-open'); 
            // Or if you prefer to toggle on header:
            // document.querySelector('header').classList.toggle('nav-open');
        });
    }
});

// Placeholder for addToCart function
function addToCart(productId) {
    console.log(`Product ${productId} added to cart.`);
    // In a real application, this would involve:
    // 1. Getting product details (name, price, image)
    // 2. Updating a cart object (e.g., in localStorage or sending to a server)
    // 3. Optionally, updating a cart icon/display on the page
    // 4. Providing user feedback (e.g., "Item added to cart!" notification)
    // For now, we'll simulate adding to cart and then redirect.
    // alert(`"${productId}" added to cart!`); // Removed alert as per user feedback
    window.location.href = 'cart.html'; // Redirect to cart page
}

// Placeholder for login redirection (will be used on login.html)
function handleLogin() {
    // Simulate login
    console.log("Login attempt...");
    // Redirect to shop page after a short delay
    setTimeout(() => {
        window.location.href = 'shop.html';
    }, 1000);
}

// Placeholder for newsletter subscription
function handleNewsletterSubscription(event) {
    event.preventDefault(); // Prevent default form submission
    const emailInput = event.target.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        console.log(`Newsletter subscription for: ${emailInput.value}`);
        alert(`Thank you for subscribing, ${emailInput.value}! (Demo)`);
        emailInput.value = ''; // Clear the input
    } else {
        alert('Please enter a valid email address.');
    }
}

// Attach newsletter subscription handler
// Need to ensure the form exists before adding event listener
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForms = document.querySelectorAll('.newsletter form, .newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterSubscription);
    });

    setupTestimonialSlider(); // Initialize the testimonial slider
    setupSubcategoryFilters(); // Initialize subcategory filter button states
    setupPriceSliders(); // Initialize price range sliders
    setupFilters(); // Initialize all filters
});

// Testimonial Slider Logic
function setupTestimonialSlider() {
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    if (!sliderContainer) return; // Only run if the slider exists on the page

    const slider = sliderContainer.querySelector('.testimonial-slider');
    const items = sliderContainer.querySelectorAll('.testimonial-item');
    const nextBtn = sliderContainer.querySelector('.next-btn');
    const prevBtn = sliderContainer.querySelector('.prev-btn');
    let currentIndex = 0;

    function updateSlider() {
        items.forEach((item, index) => {
            item.classList.remove('active');
            if (index === currentIndex) {
                item.classList.add('active');
            }
        });
        // Optional: For a sliding effect, you might use transform: translateX
        // slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % items.length;
            updateSlider();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            updateSlider();
        });
    }

    // Initialize slider
    if (items.length > 0) {
        updateSlider();
    }
}

// Subcategory Filter Button Active State
function setupSubcategoryFilters() {
    const filterContainers = document.querySelectorAll('.subcategory-filters');
    filterContainers.forEach(container => {
        const filterButtons = container.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons in this group
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to the clicked button
                this.classList.add('active');
                const filterValue = this.getAttribute('data-filter');
                
                // Actual filtering logic
                const productGrid = container.closest('.container').querySelector('.product-grid');
                if (productGrid) {
                    const products = productGrid.querySelectorAll('.product-card');
                    products.forEach(product => {
                        if (filterValue === 'all' || product.getAttribute('data-category') === filterValue) {
                            product.style.display = ''; // Or 'block', 'flex', etc., depending on your layout
                        } else {
                            product.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Price Range Slider Value Display
function setupPriceSliders() {
    const priceSliders = [
        { sliderId: 'priceRangeMen', valueId: 'priceValueMen' },
        { sliderId: 'priceRangeWomen', valueId: 'priceValueWomen' },
        { sliderId: 'priceRangeAll', valueId: 'priceValueAll' }
    ];

    priceSliders.forEach(config => {
        const slider = document.getElementById(config.sliderId);
        const valueDisplay = document.getElementById(config.valueId);

        if (slider && valueDisplay) {
            // Initialize display
            valueDisplay.textContent = slider.value;

            slider.addEventListener('input', function() {
                valueDisplay.textContent = this.value;
                const priceValue = parseInt(this.value);
                const productGrid = slider.closest('.container').querySelector('.product-grid');
                if (productGrid) {
                    const products = productGrid.querySelectorAll('.product-card');
                    products.forEach(product => {
                        const priceElement = product.querySelector('.price');
                        if (priceElement) {
                            const priceText = priceElement.textContent;
                            const price = parseInt(priceText.replace(/[^\d]/g, '')); // Extract price as integer
                            if (!isNaN(price) && price <= priceValue) {
                                product.style.display = ''; // Show product
                            } else {
                                product.style.display = 'none'; // Hide product
                            }
                        }
                    });
                }
            });
        }
    });
}

// Function to filter products based on multiple criteria
function filterProducts() {
    const categoryFilters = Array.from(document.querySelectorAll('.subcategory-filters .filter-btn.active'))
        .map(btn => btn.getAttribute('data-filter'));

    const priceRangeMen = document.getElementById('priceRangeMen');
    const priceRangeWomen = document.getElementById('priceRangeWomen');
    const priceValueMen = document.getElementById('priceValueMen');
    const priceValueWomen = document.getElementById('priceValueWomen');

    const selectedSizesMen = Array.from(document.querySelectorAll('#sizeSM:checked, #sizeMM:checked, #sizeLM:checked, #sizeXLM:checked, #sizeXXLM:checked'))
        .map(checkbox => checkbox.value);
    const selectedSizesWomen = Array.from(document.querySelectorAll('#sizeXSW:checked, #sizeSW:checked, #sizeMW:checked, #sizeLW:checked, #sizeXLW:checked'))
        .map(checkbox => checkbox.value);

    const selectedDesignsMen = Array.from(document.querySelectorAll('#designGraphicM:checked, #designSolidM:checked, #designTypographyM:checked'))
        .map(checkbox => checkbox.value);
    const selectedDesignsWomen = Array.from(document.querySelectorAll('#designGraphicW:checked, #designSolidW:checked, #designFloralW:checked'))
        .map(checkbox => checkbox.value);

    const productGrids = document.querySelectorAll('.product-grid');

    productGrids.forEach(productGrid => {
        const products = productGrid.querySelectorAll('.product-card');

        products.forEach(product => {
            let categoryMatch = false;
            if (categoryFilters.includes('all')) {
                categoryMatch = true;
            } else {
                const productCategory = product.getAttribute('data-category');
                if (categoryFilters.includes(productCategory)) {
                    categoryMatch = true;
                }
            }

            let priceMatch = false;
            const priceElement = product.querySelector('.price');
            if (priceElement) {
                const priceText = priceElement.textContent;
                const price = parseInt(priceText.replace(/[^\d]/g, ''));
                let priceLimit = 500; // Default
                if (productGrid.closest('.container').querySelector('#priceRangeMen')) {
                    priceLimit = parseInt(priceValueMen.textContent);
                } else if (productGrid.closest('.container').querySelector('#priceRangeWomen')) {
                    priceLimit = parseInt(priceValueWomen.textContent);
                }
                if (!isNaN(price) && price <= priceLimit) {
                    priceMatch = true;
                }
            }

            let sizeMatch = false;
            let designMatch = false;

            // Get size and design attributes from the product card
            const productSizes = product.dataset.sizes ? product.dataset.sizes.split(',') : [];
            const productDesigns = product.dataset.designs ? product.dataset.designs.split(',') : [];

            if (productGrid.closest('.container').querySelector('#sizeSM')) { // Men's sizes
                sizeMatch = selectedSizesMen.length === 0 || selectedSizesMen.some(size => productSizes.includes(size));
                designMatch = selectedDesignsMen.length === 0 || selectedDesignsMen.some(design => productDesigns.includes(design));
            } else { // Women's sizes
                sizeMatch = selectedSizesWomen.length === 0 || selectedSizesWomen.some(size => productSizes.includes(size));
                designMatch = selectedDesignsWomen.length === 0 || selectedDesignsWomen.some(design => productDesigns.includes(design));
            }

            if (categoryMatch && priceMatch && sizeMatch && designMatch) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    });
}

// Attach event listeners to filters
function setupFilters() {
    const filterContainers = document.querySelectorAll('.subcategory-filters');
    filterContainers.forEach(container => {
        const filterButtons = container.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', filterProducts);
        });
    });

    const priceSliders = [
        { sliderId: 'priceRangeMen', valueId: 'priceValueMen' },
        { sliderId: 'priceRangeWomen', valueId: 'priceValueWomen' },
        { sliderId: 'priceRangeAll', valueId: 'priceValueAll' }
    ];

    priceSliders.forEach(config => {
        const slider = document.getElementById(config.sliderId);
        if (slider) {
            slider.addEventListener('input', filterProducts);
        }
    });

    const sizeCheckboxesMen = document.querySelectorAll('#sizeSM, #sizeMM, #sizeLM, #sizeXLM, #sizeXXLM');
    sizeCheckboxesMen.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    const sizeCheckboxesWomen = document.querySelectorAll('#sizeXSW, #sizeSW, #sizeMW, #sizeLW, #sizeXLW');
    sizeCheckboxesWomen.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    const designCheckboxesMen = document.querySelectorAll('#designGraphicM, #designSolidM, #designTypographyM');
    designCheckboxesMen.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });

    const designCheckboxesWomen = document.querySelectorAll('#designGraphicW, #designSolidW, #designFloralW');
    designCheckboxesWomen.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Existing code
    setupTestimonialSlider();
    setupSubcategoryFilters();
    setupPriceSliders();
    setupFilters(); // Initialize all filters
});