(()=>{function d(o,t){o.scrollIntoView({behavior:t})}var r=class{constructor(){this.buttons=Array.from(document.querySelectorAll("[data-js-form-target]")),this.saleForm=document.getElementById("sale-form")}init(){this.buttons.length<1||!this.saleForm||this.buttons.forEach(t=>{t.addEventListener("click",()=>d(this.saleForm,"auto"))})}};var c=[{key:"Invalid e-mail",dict:{pl:"Prosz\u0119 wpisa\u0107 poprawny adres e-mail"}},{key:"E-mail is required",dict:{pl:"Adres e-mail jest wymagany"}}];var i=class{constructor(){this.saleForm=document.getElementById("form-sale")}init(){if(!this.saleForm)return;let t=[],e=new window.JustValidate(this.saleForm,t,c);e.setCurrentLocale("pl"),this.validate(e)}validate(t){t.addField("#email",[{rule:"required",errorMessage:"E-mail is required"},{rule:"email",errorMessage:"Invalid e-mail"}])}};var a=class{constructor(){this.modals=document.querySelectorAll("[data-js-modal]"),this.ingredientsModal=document.querySelectorAll(".modal-ingredients")}init(){var t;if(this.modals.length<1)return!1;(t=this.modals)==null||t.forEach(e=>{let s=e.querySelector("[data-js-close-modal]");this.closeModal(s)})}openIngredientsModal(){}openModal(t){let e=t.closest(".overlay");e&&(e.classList.remove("hidden"),e.classList.add("flex"))}closeModal(t){if(!t)return!1;t.addEventListener("click",()=>{let e=t.closest(".overlay");if(!e)return!1;e.classList.add("hidden"),e.classList.remove("flex")})}};var m="(min-width: 1024px)";var l=class{constructor(){this.listItems=Array.from(document.querySelectorAll("[data-js-toc-list-item]")),this.tocTargets=Array.from(document.querySelectorAll("[data-js-toc-item-target]"))}init(){if(this.listItems.length<1||this.tocTargets.length<1)return!1;this.listItems.forEach(t=>{t.addEventListener("click",e=>this.handleItemClick(e))})}handleItemClick(t){t.preventDefault();let e=t.target.getAttribute("data-js-toc-list-item"),s=this.tocTargets.find(u=>u.getAttribute("data-js-toc-item-target")===e);if(!s)return!1;let n=s.offsetTop;window.matchMedia(m).matches&&(n-=95),window.scrollTo({top:n,behavior:"smooth"})}};window.addEventListener("DOMContentLoaded",()=>{new r().init(),new i().init(),new a().init(),window.document.body.classList.contains("page-terms")&&new l().init()});})();
