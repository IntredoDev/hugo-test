(()=>{function c(s,t){s.scrollIntoView({behavior:t})}var a=class{constructor(){this.buttons=Array.from(document.querySelectorAll("[data-js-form-target]")),this.saleForm=document.getElementById("sale-form")}init(){this.buttons.length<1||!this.saleForm||this.buttons.forEach(t=>{t.addEventListener("click",()=>c(this.saleForm,"auto"))})}};var m=[{key:"Invalid e-mail",dict:{pl:"Prosz\u0119 wpisa\u0107 poprawny adres e-mail"}},{key:"E-mail is required",dict:{pl:"Adres e-mail jest wymagany"}}];var l=class{constructor(){this.saleForm=document.getElementById("form-sale")}init(){if(!this.saleForm)return;let t=[];this.validation()}validation(){let t=new window.JustValidate(this.saleForm,globalConfig,m);t.setCurrentLocale("pl"),this.validate(t)}validate(t){t.addField("#email",[{rule:"required",errorMessage:"E-mail is required"},{rule:"email",errorMessage:"Invalid e-mail"}])}};var n=class{constructor(){this.modals=document.querySelectorAll("[data-js-modal]"),this.ingredientsModal=document.querySelector("[data-js-ingredients-modal]"),this.ingredientsButtons=document.querySelectorAll("[data-js-target-modal]")}init(){var t;if(this.modals.length<1)return!1;(t=this.modals)==null||t.forEach(e=>{let o=e.querySelector("[data-js-close-modal]");this.closeModal(o)}),this.openIngredientsModal(this.ingredientsButtons,this.ingredientsModal)}openIngredientsModal(t,e){if(t.length<1||!this.ingredientsModal)return;let o=i=>{let r=this.getButtonAttributes(i);this.passAttributesToModal(r,this.ingredientsModal),this.openModal(this.ingredientsModal)};t.forEach(i=>{i.addEventListener("click",()=>o(i))})}passAttributesToModal(t,e){if(!t||!e)return;let o=e.querySelector(".modal-ingredients__title"),i=e.querySelector(".modal-ingredients__thumbnail"),r=e.querySelector(".modal-ingredients__desc");o.innerHTML=t.title,i.src=t.imageSrc,r.innerHTML=t.content}getButtonAttributes(t){if(!t)return;let e,o=t.getAttribute("data-content-title"),i=t.getAttribute("data-content-img"),r=t.getAttribute("data-content");return e={title:o,imageSrc:i,content:r}}openModal(t){let e=t.closest(".overlay");e&&(e.classList.remove("hidden"),e.classList.add("flex"))}closeModal(t){if(!t)return!1;t.addEventListener("click",()=>{let e=t.closest(".overlay");if(!e)return!1;e.classList.add("hidden"),e.classList.remove("flex")})}};var u="(min-width: 1024px)";var d=class{constructor(){this.listItems=Array.from(document.querySelectorAll("[data-js-toc-list-item]")),this.tocTargets=Array.from(document.querySelectorAll("[data-js-toc-item-target]"))}init(){if(this.listItems.length<1||this.tocTargets.length<1)return!1;this.listItems.forEach(t=>{t.addEventListener("click",e=>this.handleItemClick(e))})}handleItemClick(t){t.preventDefault();let e=t.target.getAttribute("data-js-toc-list-item"),o=this.tocTargets.find(r=>r.getAttribute("data-js-toc-item-target")===e);if(!o)return!1;let i=o.offsetTop;window.matchMedia(u).matches&&(i-=95),window.scrollTo({top:i,behavior:"smooth"})}};window.addEventListener("DOMContentLoaded",()=>{new a().init(),new l().init(),new n().init(),window.document.body.classList.contains("page-terms")&&new d().init()});})();
