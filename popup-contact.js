// Contact Popup Component
// This file contains the reusable popup functionality that can be included on any page

// Popup HTML structure (to be inserted before closing body tag)
const POPUP_HTML = `
<!-- Contact Popup Modal -->
<div 
  id="contactPopup" 
  class="fixed inset-0 z-50 hidden items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
  x-data="{ show: false }"
  x-show="show"
  x-transition:enter="transition ease-out duration-300"
  x-transition:enter-start="opacity-0"
  x-transition:enter-end="opacity-100"
  x-transition:leave="transition ease-in duration-200"
  x-transition:leave-start="opacity-100"
  x-transition:leave-end="opacity-0"
>
  <div 
    class="relative w-full max-w-md mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all duration-300"
    x-show="show"
    x-transition:enter="transition ease-out duration-300 delay-100"
    x-transition:enter-start="opacity-0 scale-95 translate-y-4"
    x-transition:enter-end="opacity-100 scale-100 translate-y-0"
    x-transition:leave="transition ease-in duration-200"
    x-transition:leave-start="opacity-100 scale-100 translate-y-0"
    x-transition:leave-end="opacity-0 scale-95 translate-y-4"
    @click.stop
  >
    <!-- Close Button -->
    <button 
      onclick="closeContactPopup()"
      class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <!-- Popup Header -->
    <div class="p-6 pb-4">
      <div class="text-center mb-4">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Get In Touch
        </h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm">
          Ready to start your project? Let's discuss your requirements!
        </p>
      </div>

      <!-- Contact Form -->
      <form id="popupContactForm" class="space-y-4">
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="popup-fullname">
              Full Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullname"
              id="popup-fullname"
              placeholder="Your full name"
              required
              class="vd ph sg zk xm _g ch pm hm dm dn em pl/50 xi mi"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="popup-email">
              Email Address <span class="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="popup-email"
              placeholder="connect@intrepidtechnology.in"
              required
              class="vd ph sg zk xm _g ch pm hm dm dn em pl/50 xi mi"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="popup-phone">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="popup-phone"
              placeholder="Enter your phone number"
              class="vd ph sg zk xm _g ch pm hm dm dn em pl/50 xi mi"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="popup-subject">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="popup-subject"
              placeholder="What can we help you with?"
              class="vd ph sg zk xm _g ch pm hm dm dn em pl/50 xi mi"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" for="popup-message">
              Message <span class="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Tell us about your project..."
              rows="3"
              name="message"
              id="popup-message"
              required
              class="vd ph sg zk xm _g ch pm hm dm dn em pl/50 ci"
            ></textarea>
          </div>
        </div>

        <div class="flex gap-3 pt-2">
          <button 
            type="button" 
            onclick="closeContactPopup()"
            class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
          >
            Maybe Later
          </button>
          <button 
            type="submit" 
            class="flex-1 vc rg lk gh ml il hi gi _l"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
`;

// Popup functionality
let popupShown = false;
let popupTimer = null;

function showContactPopup() {
  if (popupShown) return;

  const popup = document.getElementById("contactPopup");
  if (!popup) return;

  const alpineData = Alpine.$data(popup);

  popup.classList.remove("hidden");
  popup.classList.add("flex");
  alpineData.show = true;
  popupShown = true;

  // Store that popup was shown for this session
  sessionStorage.setItem("popupShown", "true");
}

function closeContactPopup() {
  const popup = document.getElementById("contactPopup");
  if (!popup) return;

  const alpineData = Alpine.$data(popup);

  alpineData.show = false;

  setTimeout(() => {
    popup.classList.add("hidden");
    popup.classList.remove("flex");
  }, 200);
}

// Initialize popup functionality
function initializeContactPopup() {
  // Insert popup HTML into the page
  const popupContainer = document.createElement("div");
  popupContainer.innerHTML = POPUP_HTML;
  document.body.appendChild(popupContainer.firstElementChild);

  // Initialize popup timer on page load
  document.addEventListener("DOMContentLoaded", function () {
    // Check if this is first visit in this session and popup hasn't been shown
    const hasSeenPopup = sessionStorage.getItem("popupShown");
    const isFirstVisit = !localStorage.getItem("hasVisited");

    if (
      !hasSeenPopup &&
      (isFirstVisit || !localStorage.getItem("popupDismissed"))
    ) {
      // Set up 30-second timer
      popupTimer = setTimeout(() => {
        showContactPopup();
      }, 30000); // 30 seconds
    }

    // Mark that user has visited the site
    localStorage.setItem("hasVisited", "true");

    // Handle popup form submission
    const popupForm = document.getElementById("popupContactForm");
    if (popupForm) {
      popupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitButton = popupForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        // Show loading state
        submitButton.innerHTML = `
          <span style="display: inline-flex; align-items: center; gap: 8px;">
            <span style="
              width: 16px;
              height: 16px;
              border: 2px solid rgba(255,255,255,0.3);
              border-top: 2px solid white;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            "></span>
            Sending...
          </span>
        `;
        submitButton.disabled = true;

        // Collect form data
        const formData = new FormData(popupForm);

        // Validate required fields
        const requiredFields = ["fullname", "email", "message"];
        const missingFields = requiredFields.filter(
          (field) => !formData.get(field)?.trim()
        );

        if (missingFields.length > 0) {
          alert(
            `Please fill in the following required fields: ${missingFields.join(
              ", "
            )}`
          );
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          return;
        }

        // Convert to URL-encoded format
        const data = new URLSearchParams();
        for (let [key, value] of formData.entries()) {
          data.append(key, value);
        }

        // Submit to same endpoint as main contact form
        const scriptURL =
          "https://script.google.com/macros/s/AKfycbzP7ARODcBL894vGh_prBkAtboC2WRrcWzwlafYckVIdv6SkTKHy0Zc4TJi6uLrBYyW/exec";

        fetch(scriptURL, {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            if (data.success) {
              alert(
                "Thank you! Your message has been sent successfully. We'll get back to you soon!"
              );
              popupForm.reset();
              closeContactPopup();
              // Don't show popup again in this session
              localStorage.setItem("popupDismissed", "true");
            } else {
              throw new Error(data.message || "Form submission failed");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(
              "Sorry, there was an error sending your message. Please try again or contact us directly."
            );
          })
          .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
          });
      });
    }
  });

  // Close popup when clicking outside
  document.addEventListener("click", function (e) {
    const popup = document.getElementById("contactPopup");
    if (e.target === popup) {
      closeContactPopup();
    }
  });

  // Close popup with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeContactPopup();
    }
  });

  // Clear timer if user navigates away
  window.addEventListener("beforeunload", function () {
    if (popupTimer) {
      clearTimeout(popupTimer);
    }
  });
}

// Auto-initialize when script loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeContactPopup);
} else {
  initializeContactPopup();
}
