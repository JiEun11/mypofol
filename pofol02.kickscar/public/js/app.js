const PortfolioApp = {

    init: function() {
        $(document).scroll(this._onDocumentScroll);
        $(".navbar__menu li").click(this._onMenuItemClicked);
        $("section.section").each((index, section) => this._itersectionObserver.observe(section));   
    },
    _targetSectionIdClicked: null,
    _activateSection: function(sectionId) {
        console.log("--------->", sectionId);

        $(".navbar__menu li.active").removeClass("active");
        $(`.navbar__menu li[data-link='#${sectionId}']`).addClass("active");

        this._targetSectionIdClicked = null;
    },
    _onDocumentScroll: function() {
        const $navbar = $("#navbar");
        const scrollTop = $(window).scrollTop();
        const navbarHeight = $navbar.height();

        $navbar[(scrollTop > navbarHeight) ? "addClass" : "removeClass"]("navbar--dark");
    },
    _onMenuItemClicked: function() {
        const $menuItem = $(this);
        const dataLink = $menuItem.data('link');

        PortfolioApp._targetSectionIdClicked = dataLink.substring(1);
        $menuItem.parent().removeClass("open");
        dataLink && $(dataLink)[0].scrollIntoView({ behavior: "smooth" });
    },
    _itersectionObserver: new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
        if(!entry.isIntersecting ||
            entry.intersectionRatio < 0 || 
            (PortfolioApp._targetSectionIdClicked != null && PortfolioApp._targetSectionIdClicked != entry.target.id)) {
            return;
        }

        PortfolioApp._activateSection(e.target.id);

    }), {
        root: null,
        rootMargin: "0px",
        threshold: 0.3     
    })
};




   

    
