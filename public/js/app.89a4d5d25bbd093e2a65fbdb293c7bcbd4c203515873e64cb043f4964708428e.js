(()=>{function c(i,t){i.scrollIntoView({behavior:t})}var r=class{constructor(){this.buttons=Array.from(document.querySelectorAll("[data-js-form-target]")),this.saleForm=document.getElementById("sale-form")}init(){this.buttons.length<1||!this.saleForm||this.buttons.forEach(t=>{t.addEventListener("click",()=>c(this.saleForm,"auto"))})}};var m=[{key:"Invalid e-mail",dict:{pl:"Prosz\u0119 wpisa\u0107 poprawny adres e-mail"}},{key:"E-mail is required",dict:{pl:"Adres e-mail jest wymagany"}}];var a=class{constructor(){this.saleForm=document.getElementById("form-sale")}init(){if(!this.saleForm)return;let t=[],e=new window.JustValidate(this.saleForm,t,m);e.setCurrentLocale("pl"),this.validate(e)}validate(t){t.addField("#email",[{rule:"required",errorMessage:"E-mail is required"},{rule:"email",errorMessage:"Invalid e-mail"}])}};var l=class{constructor(){this.modals=document.querySelectorAll("[data-js-modal]"),this.ingredientsModal=document.querySelector("[data-js-ingredients-modal]"),this.ingredientsButtons=document.querySelectorAll("[data-js-target-modal]")}init(){var t;if(this.modals.length<1)return!1;(t=this.modals)==null||t.forEach(e=>{let o=e.querySelector("[data-js-close-modal]");this.closeModal(o)}),this.openIngredientsModal(this.ingredientsButtons,this.ingredientsModal)}openIngredientsModal(t,e){t.length<1||!this.ingredientsModal||t.forEach(o=>{o.addEventListener("click",()=>{let s=this.getButtonAttributes(o);this.openModal(this.ingredientsModal),console.log(s)})})}getButtonAttributes(t){if(!t)return;let e,o=t.getAttribute("data-content-title"),s=t.getAttribute("data-content-img"),d=t.getAttribute("data-content");return e={title:o,image:s,content:d}}openModal(t){let e=t.closest(".overlay");e&&(e.classList.remove("hidden"),e.classList.add("flex"))}closeModal(t){if(!t)return!1;t.addEventListener("click",()=>{let e=t.closest(".overlay");if(!e)return!1;e.classList.add("hidden"),e.classList.remove("flex")})}};var u="(min-width: 1024px)";var n=class{constructor(){this.listItems=Array.from(document.querySelectorAll("[data-js-toc-list-item]")),this.tocTargets=Array.from(document.querySelectorAll("[data-js-toc-item-target]"))}init(){if(this.listItems.length<1||this.tocTargets.length<1)return!1;this.listItems.forEach(t=>{t.addEventListener("click",e=>this.handleItemClick(e))})}handleItemClick(t){t.preventDefault();let e=t.target.getAttribute("data-js-toc-list-item"),o=this.tocTargets.find(d=>d.getAttribute("data-js-toc-item-target")===e);if(!o)return!1;let s=o.offsetTop;window.matchMedia(u).matches&&(s-=95),window.scrollTo({top:s,behavior:"smooth"})}};window.addEventListener("DOMContentLoaded",()=>{new r().init(),new a().init(),new l().init(),window.document.body.classList.contains("page-terms")&&new n().init()});})();
