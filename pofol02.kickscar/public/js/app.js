const nonconcurrencify = (fn) => {
    let lock = null;

    return async (...args) => {
        if(lock) {
            return;
        }

        lock = {};
        const result = await fn(...args);
        lock = null;

        return result;
    };
}

const PortfolioApp = {
    init: function(userId) {
        $(document).scroll(this._onDocumentScroll);
        $(window).on('wheel', this._onWindowWheel);

        $('.navbar__menu li').click(this._onMenuItemClicked);
        $(document).on('click', '.category__btn', this._onProjectCategoryBtnClicked);
        $('.home__contact').click(() => $('.navbar__menu li[data-link="#contact"]')[0].dispatchEvent(new Event('click')));
        $('.arrow-up').click(() => $('.navbar__menu li[data-link="#home"]')[0].dispatchEvent(new Event('click')));        
        $('.navbar__toggle-btn').click(() => $('.navbar__menu').toggleClass('open'));

        $('section.section').each((index, section) => this._itersectionObserver.observe(section));
        
        this._userId = userId;
    },
    _activateSection: async function(sectionId) {
        $('.navbar__menu li.active').removeClass('active');
        $(`.navbar__menu li[data-link='#${sectionId}']`).addClass('active');
        this._targetSectionIdClicked = null;

        console.log(sectionId);

        // ajax
        switch(sectionId) {
            case 'about': {
                this._fetchExperiences();
                this._fetchEducations();
                this._fetchTrainings();
                break;
            }
            case 'work': {
                this._fetchProjects();
                break;
            }
            case 'contact': {
                this._fetchContacts();
                break;
            }
            case 'skills': {
                this._fetchSkills();
                break;
            }
        }
    },
    _fetchSkills: nonconcurrencify(async () => {
        //$('#skills .load-indicator').show().next().html('');

        const response = await $.ajax({
            url: `/api/${PortfolioApp._userId}/skills`,
            async: true,
            type: 'get',
            dataType: 'json',
            data: '',
        });

        if(response.result != "success") {
            console.error(response.message);
            return;
        }

        // rendering
        $('#skills .load-indicator').hide().next().html(PortfolioApp._EJSTemplates.listSkillset.render({
            skills: response.data
        }));
    }),    
    _fetchContacts: nonconcurrencify(async () => {
        //$('#contact .load-indicator').show().next().html('');

        const response = await $.ajax({
            url: `/api/${PortfolioApp._userId}/contacts`,
            async: true,
            type: 'get',
            dataType: 'json',
            data: '',
        });

        if(response.result != "success") {
            console.error(response.message);
            return;
        }

        // rendering
        $('#contact .load-indicator').hide().next().html(PortfolioApp._EJSTemplates.contacts.render({
            contacts: response.data
        }));
    }),
    _fetchProjects: nonconcurrencify(async () => {
        //$('#work .load-indicator').show().next().html('');
        //$('#work .work__projects').html('');

        const response = await $.ajax({
            url: `/api/${PortfolioApp._userId}/projects`,
            async: true,
            type: 'get',
            dataType: 'json',
            data: '',
        });

        if(response.result != "success") {
            console.error(response.message);
            return;
        }

        // rendering
        $('#work .load-indicator').hide().next().html(PortfolioApp._EJSTemplates.projectCategories.render(response.data));
        //$('#work .work__projects').html(PortfolioApp._EJSTemplates.listProjects.render({
        //    projects: response.data.projects
        //}));
        
        // click All button
        PortfolioApp._onProjectCategoryBtnClicked.call($('.category__btn[data-filter="*"]')[0], new Event('click'));
    }),
    _fetchExperiences: nonconcurrencify(async () => {
        //$('#about .container-experiences .load-indicator').show().next().html('');

        const response = await $.ajax({
            url: `/api/${PortfolioApp._userId}/experiences`,
            async: true,
            type: 'get',
            dataType: 'json',
            data: '',
        });

        if(response.result != "success") {
            console.error(response.message);
            return;
        }

        // rendering
        $('#about .container-experiences .load-indicator').hide().next().html(PortfolioApp._EJSTemplates.listExperiences.render({
            experiences: response.data
        }));        
    }),
    _fetchEducations: nonconcurrencify(async () => {
        //$('#about .container-educations .load-indicator').show().next().html('');

        const response = await $.ajax({
            url: `/api/${PortfolioApp._userId}/educations`,
            async: true,
            type: 'get',
            dataType: 'json',
            data: '',
        });

        if(response.result != "success") {
            console.error(response.message);
            return;
        }

        // rendering
        $('#about .container-educations .load-indicator').hide().next().html(PortfolioApp._EJSTemplates.listEducations.render({
            educations: response.data
        }));        
    }),
    _fetchTrainings: nonconcurrencify(async () => {
        //$('#about .container-trainings .load-indicator').show().next().html('');

        const response = await $.ajax({
            url: `/api/${PortfolioApp._userId}/trainings`,
            async: true,
            type: 'get',
            dataType: 'json',
            data: '',
        });

        if(response.result != "success") {
            console.error(response.message);
            return;
        }

        // rendering
        $('#about .container-trainings .load-indicator').hide().next().html(PortfolioApp._EJSTemplates.listTrainings.render({
            trainings: response.data
        }));        
    }),
    _onDocumentScroll: function() {
        const $navbar = $('#navbar');
        const $homeContainer = $('.home__container');
        const $arrowUp = $('.arrow-up');

        const scrollTop = $(window).scrollTop();
        const navbarHeight = $navbar.height();
        const homeContainerHeight = $homeContainer.height();

        $navbar[(scrollTop > navbarHeight) ? 'addClass' : 'removeClass']('navbar--dark');
        $arrowUp[(scrollTop > homeContainerHeight / 2) ? 'addClass' : 'removeClass']('visible');
        
        $homeContainer.css({
            opacity: 1 - scrollTop / homeContainerHeight
        });
    },
    _onWindowWheel: function() {
        const $window = $(window);

        const windowScrollTop = $window.scrollTop();
        const windowHeight = $window.height();
        const bodyHeight = $('body').height();

        if(windowScrollTop === 0) {
            // console.log('select home', 'is this need?');
            return;
        }

        if(windowScrollTop + windowHeight === bodyHeight) {
            // console.log('select contact', 'is this need?');
        }
    },
    _onMenuItemClicked: function() {
        const $menuItem = $(this);
        const dataLink = $menuItem.data('link');

        PortfolioApp._targetSectionIdClicked = dataLink.substring(1);
        $menuItem.parent().removeClass('open');
        dataLink && $(dataLink)[0].scrollIntoView({ behavior: 'smooth' });
    },
    _onProjectCategoryBtnClicked: function() {
        const $button = $(this);
        const filter = $button.data('filter');
        if(filter == null) {
            return;
        }

        $('.category__btn.selected').removeClass('selected');
        $button.addClass('selected');
        $('.work__projects').addClass('anim-out');

        setTimeout(function() {
            $('.project').each((index, project) => {
                const $project = $(project);
                $project[(filter === "*" || filter === $project.data('type')) ? 'removeClass' : 'addClass']('invisible');
            });

            $('.work__projects').removeClass('anim-out');
        }, 300);
    },
    _EJSTemplates: {
        listExperiences: new EJS({url: '/js/ejs/templates/list-experiences.ejs'}),
        listEducations: new EJS({url: '/js/ejs/templates/list-educations.ejs'}),
        listTrainings: new EJS({url: '/js/ejs/templates/list-trainings.ejs'}),
        projectCategories: new EJS({url: '/js/ejs/templates/project-categories.ejs'}),
        listProjects: new EJS({url: '/js/ejs/templates/list-projects.ejs'}),
        contacts: new EJS({url: '/js/ejs/templates/contacts.ejs'}),
        listSkillset: new EJS({url: '/js/ejs/templates/list-skillsets.ejs'})
    },
    _userId: null,
    _targetSectionIdClicked: null,
    _itersectionObserver: new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
        if( !entry.isIntersecting ||
            entry.intersectionRatio < 0 || 
            (PortfolioApp._targetSectionIdClicked != null && PortfolioApp._targetSectionIdClicked != entry.target.id)) {
            return;
        }

        PortfolioApp._activateSection(entry.target.id);
    }), {
        root: null,
        rootMargin: '0px',
        threshold: 0.3   
    })
};