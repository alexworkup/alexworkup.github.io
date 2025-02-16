document.addEventListener('reactHydrated', () => {
    
    ScrollTrigger.matchMedia({
        "(min-width: 768px)": function() {
          setupAnimations({
            partnersStart: 'top 35%',
            partnersPinStart: 'top 10%',
            benefitStart: 'top 70%',
            partnersEnd: 'bottom 50%',
            benefitEnd: "bottom 60%",
            pinPartners: true
          });
        },
      
        "(max-width: 767px)": function() {
          setupAnimations({
            partnersStart: 'top 50%',
            benefitStart: 'top 30%',
            partnersEnd: 'bottom 0',
            benefitEnd: "bottom 60%",
            pinPartners: false
          });
        }
      });
            
      function setupAnimations({ partnersStart, partnersPinStart, benefitStart, partnersEnd, benefitEnd, pinPartners }) {
        gsap.from('#partners .lc-features__item', {
          opacity: 0,
          y: 50,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '#partners',
            start: partnersStart,
            end: partnersEnd,
            scrub: true,
            //markers: true,
          }
        });

        if (pinPartners) {
          ScrollTrigger.create({
            trigger: '#partners',
            start: partnersPinStart,
            end: partnersEnd,
            pin: true,
            invalidateOnRefresh: true,
            //markers: true,
          });
        }
      
        // Анимация для секции #benefit
        gsap.to("#benefit", {
          scrollTrigger: {
            trigger: "#benefit",
            start: benefitStart,
            end: benefitEnd,
            toggleActions: "play none none reverse",
            //markers: true,
            onEnter: () => document.getElementById("benefit").classList.add("show"),
          },        
        });
      }
});
