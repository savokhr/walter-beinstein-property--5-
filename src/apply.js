// --- Standalone Elite Properties Form Application Script ---
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initApplicationForm();
  initRevealOnScroll();
});

// 1. Mobile Menu Drawer & Sticky Nav Logic
function initNavbar() {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  // Mobile Menu Controls
  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileDrawer.classList.remove("hidden");
    });
  }
  if (mobileMenuClose && mobileDrawer) {
    mobileMenuClose.addEventListener("click", () => {
      mobileDrawer.classList.add("hidden");
    });
  }

  // Close mobile drawer on link click
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (mobileDrawer) {
        mobileDrawer.classList.add("hidden");
      }
    });
  });
}

// 2. Application Form Section logic (Toggle Tabs & Fee Brand Selected States)
function initApplicationForm() {
  const rentTab = document.getElementById("intent-rent-tab");
  const buyTab = document.getElementById("intent-buy-tab");
  const intentInput = document.getElementById("app-intent-type"); // Hidden input tracking intent type
  const appForm = document.getElementById("luxury-app-form");

  const leaseSection = document.getElementById("field-lease-duration");
  const incomeLabel = document.getElementById("field-income-label");

  // Toggle Tab Actions
  if (rentTab && buyTab && intentInput) {
    rentTab.addEventListener("click", () => {
      // Style updates
      rentTab.classList.add("bg-forest", "text-cream");
      rentTab.classList.remove("bg-sand/40", "text-charcoal/60");
      buyTab.classList.remove("bg-forest", "text-cream");
      buyTab.classList.add("bg-sand/40", "text-charcoal/60");

      intentInput.value = "Rent";
      
      // Show/hide fields
      if (leaseSection) leaseSection.classList.remove("hidden");
      if (incomeLabel) incomeLabel.textContent = "Estimated Monthly Income (USD)";
    });

    buyTab.addEventListener("click", () => {
      // Style updates
      buyTab.classList.add("bg-forest", "text-cream");
      buyTab.classList.remove("bg-sand/40", "text-charcoal/60");
      rentTab.classList.remove("bg-forest", "text-cream");
      rentTab.classList.add("bg-sand/40", "text-charcoal/60");

      intentInput.value = "Buy";

      // Show/hide fields
      if (leaseSection) leaseSection.classList.add("hidden");
      if (incomeLabel) incomeLabel.textContent = "Estimated Liquid Funds / Budget (USD)";
    });
  }

  // Payment Method Selection Grid Highlight Action
  const paymentTiles = document.querySelectorAll(".payment-method-tile");
  const paymentSelectedInput = document.getElementById("app-payment-method-input");

  paymentTiles.forEach(tile => {
    tile.addEventListener("click", () => {
      paymentTiles.forEach(t => {
        t.classList.remove("border-forest", "bg-sand/30");
        t.classList.add("border-sand/60", "bg-cream/40");
        // Hide small checked checkmark if present inside tiles
        const chk = t.querySelector(".tile-checkmark");
        if (chk) chk.classList.add("hidden");
      });

      tile.classList.add("border-forest", "bg-sand/30");
      tile.classList.remove("border-sand/60", "bg-cream/40");
      const chk = tile.querySelector(".tile-checkmark");
      if (chk) chk.classList.remove("hidden");

      if (paymentSelectedInput) {
        paymentSelectedInput.value = tile.getAttribute("data-method");
      }
    });
  });

  // Handle Form Submission
  if (appForm) {
    appForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Basic field checks
      const firstName = document.getElementById("app-first-name").value;
      const lastName = document.getElementById("app-last-name").value;
      const email = document.getElementById("app-email").value;
      const phone = document.getElementById("app-phone").value;
      
      // Select single checkbox for credit score
      const checkedCredit = document.querySelector('input[name="credit_score"]:checked');
      if (!checkedCredit) {
        alert("Please select your current Credit Score Range.");
        return;
      }

      const intent = intentInput ? intentInput.value : "Rent";
      const paymentMethod = paymentSelectedInput ? paymentSelectedInput.value : "";
      if (!paymentMethod) {
        alert("Please select a preferred payment method to handle the application verification fee.");
        return;
      }

      const submitBtn = document.getElementById("app-submit-btn");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin text-cream/80 h-4 w-4 mr-2 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <span>Reviewing Dossier...</span>
        `;
      }

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            email: email,
            phone: phone,
            reason: `Tenant Application (${intent})`,
            message: `Credit Score Range: ${checkedCredit.value}. Preferred Verification Fee Payment Method: ${paymentMethod}.`,
          }),
        });

        if (!response.ok) {
          throw new Error("SMTP server communication failure");
        }

        // Trigger verification modal
        const modal = document.getElementById("submission-confirmation-modal");
        const clientEmailPlaceholder = document.getElementById("confirm-client-email");
        
        if (clientEmailPlaceholder) {
          clientEmailPlaceholder.textContent = email;
        }

        if (modal) {
          modal.classList.remove("hidden");
          modal.classList.add("flex");
          document.body.classList.add("overflow-hidden");
        }
      } catch (error) {
        console.error("Application transmission failed:", error);
        alert("There was an issue transmitting your tenant application dossier. Please try again.");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "<span>Submit Application</span>";
        }
      }
    });
  }

  // Handle Close confirmation modal event
  const closeConfirmBtn = document.getElementById("close-confirm-modal-btn");
  if (closeConfirmBtn) {
    closeConfirmBtn.addEventListener("click", () => {
      const modal = document.getElementById("submission-confirmation-modal");
      if (modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.classList.remove("overflow-hidden");
      }
    });
  }
}

// 3. Scroll Reveal Animations
function initRevealOnScroll() {
  const reveals = document.querySelectorAll(".fade-in-up, .fade-in");
  
  const revealActive = () => {
    const triggerBottom = window.innerHeight * 0.95;
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealActive);
  setTimeout(revealActive, 300); // Trigger initial checks
}
