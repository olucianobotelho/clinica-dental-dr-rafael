// Futuras funcionalidades interativas do site do Dr. Rafael Oliveira
// Por exemplo, menu mobile, carrossel de depoimentos, validação de formulário, etc.

console.log("JavaScript carregado. Que a força (e o bom humor) estejam conosco!");

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Cache de elementos DOM frequentemente usados
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const backToTop = document.querySelector('.back-to-top');
  const faqItems = document.querySelectorAll('.faq-item');
  const navItems = document.querySelectorAll('.nav-link');
  const scrollDownBtn = document.querySelector('.scroll-down a');
  
  // Verificar se é dispositivo móvel
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  // Menu Mobile Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.setAttribute('aria-expanded', navLinks.classList.contains('active'));
      
      // Adicionar/remover classe no body para prevenir scroll quando menu está aberto
      if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // Fechar menu mobile ao clicar em um link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        navLinks.classList.remove('active');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        
        // Adicionar pequeno atraso para um fechamento mais suave
        setTimeout(() => {
          // Se for um link de âncora, role para a seção após o fechamento do menu
          const href = link.getAttribute('href');
          if (href.startsWith('#') && href !== '#') {
            const targetSection = document.querySelector(href);
            if (targetSection) {
              const headerHeight = header.offsetHeight;
              const targetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
              window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
              });
            }
          }
        }, 300);
      }
    });
  });

  // Fechar menu ao clicar fora dele
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navLinks.contains(event.target);
    const isClickOnToggle = mobileToggle.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Header ao scroll
  function handleScroll() {
    // Alterar aparência do header ao scroll
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Mostrar/esconder botão de voltar ao topo
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
    
    // Destacar item de navegação atual com base no scroll
    const scrollPosition = window.scrollY + 200;
    
    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll);
  
  // Inicializar estado do scroll
  handleScroll();

  // Scroll suave para links de âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop;
        
        // Ajuste para header fixo baseado no dispositivo
        const headerOffset = isMobile ? 70 : 80;
        
        window.scrollTo({
          top: offsetTop - headerOffset,
          behavior: 'smooth'
        });
      }
    });
  });

  // FAQ toggle
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Fechar os outros itens
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle no item atual
      item.classList.toggle('active');
    });
  });
  
  // Back to top
  if (backToTop) {
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Ajustar altura do hero
  function adjustHeroHeight() {
    const windowHeight = window.innerHeight;
    const headerHeight = header.offsetHeight;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
      heroSection.style.height = `${windowHeight}px`;
      heroSection.style.paddingTop = `${headerHeight}px`;
    }
  }
  
  // Ajustar tamanho em dispositivos móveis
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
      adjustHeroHeight();
    }
  });
  
  // Inicializar em dispositivos móveis
  if (window.innerWidth <= 768) {
    adjustHeroHeight();
  }
});