<template>
    <div id="clipObserver">
                <div class="lds-dual-ring loader"></div>

    </div>
    </template>
    <script>
    export default {
        data(){
            return{
                clipObserver: null
            }
        },
        mounted(){
            this.clipObserver = new IntersectionObserver(([entry]) => {
                if(entry && entry.isIntersecting){
                    this.$emit('intersect');
                }
            });
            this.clipObserver.observe(this.$el);
        }
    }
    </script>
    <style>
        #clipObserver{
            height: 1px;
        }
        .loader {
            top: 0 !important;
            display: block !important;
            margin-left: auto !important;
            margin-right: auto !important;
        }
        .lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

    
    </style>