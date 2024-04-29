export class Pagination {
  /**
   *
   * @param {Object} configObj Config object
   * @param {HTMLElement} configObj.nav
   * @param {HTMLElement[]} configObj.pages
   */
  constructor({ nav, pages, clickableIndicators = false }) {
    this.nav = nav;
    this.indicators = Array.from(this.nav.querySelectorAll("[data-page]"));
    this.pages = Array.from(pages);
    this.activeIndex = 1;

    this.nextPage = this.nextPage.bind(this);

    const [firstButton] = this.indicators;
    firstButton.classList.add("active");

    if (clickableIndicators) {
      this.indicators.forEach(button => {
        const pageIndex = button.dataset.page;
        const [page] = this.pages.filter(p => p.dataset.index === pageIndex);

        button.addEventListener("click", () => {
          const visiblePage = document.querySelector(".show[data-index]");
          const activeIndicator = document.querySelector(".active[data-page]");

          visiblePage.classList.remove("show");
          visiblePage.classList.add("hide");
          page.classList.remove("hide");
          page.classList.add("show");

          if (activeIndicator) {
            activeIndicator.classList.remove("active");
            activeIndicator.classList.add("visited");
          }

          if (button.classList.contains("visited")) {
            button.classList.remove("visited");
            button.classList.add("active");
          } else {
            button.classList.add("active");
          }

          this.activeIndex = parseInt(pageIndex);
        });
      });
    }
  }

  nextPage() {
    const [indicator] = this.indicators.filter(
      b => parseInt(b.dataset.page) === this.activeIndex + 1
    );
    const [page] = this.pages.filter(
      p => parseInt(p.dataset.index) === this.activeIndex + 1
    );
    const visiblePage = document.querySelector(".show[data-index]");
    const activeIndicator = document.querySelector(".active[data-page]");

    visiblePage.classList.remove("show");
    visiblePage.classList.add("fade-out");
    setTimeout(() => {
      visiblePage.classList.remove("fade-out");
      visiblePage.classList.add("hide");
      page.classList.remove("hide");
      page.classList.add("show");

      if (activeIndicator) {
        activeIndicator.classList.remove("active");
        activeIndicator.classList.add("visited");
      }

      if (indicator.classList.contains("visited")) {
        indicator.classList.remove("visited");
        indicator.classList.add("active");
      } else {
        indicator.classList.add("active");
      }

      this.activeIndex = this.activeIndex + 1;
    }, 333);
  }

  prevPage() {
    const [indicator] = this.indicators.filter(
      b => parseInt(b.dataset.page) === this.activeIndex - 1
    );
    const [page] = this.pages.filter(
      p => parseInt(p.dataset.index) === this.activeIndex - 1
    );
    const visiblePage = document.querySelector(".show[data-index]");
    const activeIndicator = document.querySelector(".active[data-page]");

    visiblePage.classList.remove("show");
    visiblePage.classList.add("fade-out");
    setTimeout(() => {
      visiblePage.classList.remove("show");
      visiblePage.classList.add("hide");
      page.classList.remove("hide");
      page.classList.add("show");

      if (activeIndicator) {
        activeIndicator.classList.remove("active");
        activeIndicator.classList.add("visited");
      }

      if (indicator.classList.contains("visited")) {
        indicator.classList.remove("visited");
        indicator.classList.add("active");
      } else {
        indicator.classList.add("active");
      }

      this.activeIndex = this.activeIndex - 1;
    }, 333);
  }
}
