(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{"3e42":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("card-base",{ref:"cardBase"},[t("canvas",{attrs:{id:"containerLine"}})])},i=[],r=(t("7f7f"),t("fc8b")),l={name:"F2Line",components:{CardBase:r["a"]},data:function(){return{dataChart:[{day:"Mon",value:300},{day:"Tue",value:400},{day:"Wed",value:350},{day:"Thu",value:500},{day:"Fri",value:490},{day:"Sat",value:600},{day:"Sun",value:900}]}},mounted:function(){this.renderChart()},methods:{renderChart:function(){var e=new this.$f2.Chart({id:"containerLine",pixelRatio:window.devicePixelRatio,height:300,width:this.$refs.cardBase.$el.offsetWidth-50});e.source(this.dataChart,{value:{tickCount:5,min:0},day:{range:[0,1]}}),e.tooltip({showCrosshairs:!0,showItemMarker:!1,onShow:function(e){var a=e.items;a[0].name=null,a[0].value="$ "+a[0].value}}),e.axis("day",{label:function(e,a,t){var n={};return 0===a?n.textAlign="left":a===t-1&&(n.textAlign="right"),n}}),e.line().position("day*value"),e.point().position("day*value").style({stroke:"#fff",lineWidth:1}),e.render()}}},o=l,s=t("2877"),u=Object(s["a"])(o,n,i,!1,null,null,null);a["default"]=u.exports},fc8b:function(e,a,t){"use strict";var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"col-md-6 col-lg-6 col-xs-12"},[t("q-card",[t("q-card-section",[e._t("default")],2)],1)],1)},i=[],r={name:"CardBase"},l=r,o=t("2877"),s=t("f09f"),u=t("a370"),d=t("eebe"),c=t.n(d),f=Object(o["a"])(l,n,i,!1,null,null,null);a["a"]=f.exports;c()(f,"components",{QCard:s["a"],QCardSection:u["a"]})}}]);