(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{"706e":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("card-base",{ref:"cardBase"},[a("canvas",{attrs:{id:"containerArea"}})])},n=[],r=a("fc8b"),o={name:"F2Area",components:{CardBase:r["a"]},data:function(){return{dataChart:[{time:"2016-08-08 00:00:00",tem:10},{time:"2016-08-08 00:10:00",tem:22},{time:"2016-08-08 00:30:00",tem:16},{time:"2016-08-09 00:35:00",tem:26},{time:"2016-08-09 01:00:00",tem:12},{time:"2016-08-09 01:20:00",tem:26},{time:"2016-08-10 01:40:00",tem:18},{time:"2016-08-10 02:00:00",tem:26},{time:"2016-08-10 02:20:00",tem:12}]}},mounted:function(){this.renderChart()},methods:{renderChart:function(){var t=new this.$f2.Chart({id:"containerArea",pixelRatio:window.devicePixelRatio,height:300,width:this.$refs.cardBase.$el.offsetWidth-25});t.source(this.dataChart,{time:{type:"timeCat",tickCount:3,range:[0,1]},tem:{tickCount:5,min:0}}),t.axis("time",{label:function(t,e,a){var i={};return 0===e?i.textAlign="left":e===a-1&&(i.textAlign="right"),i}}),t.tooltip({showCrosshairs:!0}),t.area().position("time*tem").color("l(90) 0:#1890FF 1:#f7f7f7").shape("smooth"),t.line().position("time*tem").color("l(90) 0:#1890FF 1:#f7f7f7").shape("smooth"),t.render()}}},s=o,c=a("2877"),m=Object(c["a"])(s,i,n,!1,null,null,null);e["default"]=m.exports},fc8b:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-md-6 col-lg-6 col-xs-12"},[a("q-card",[a("q-card-section",[t._t("default")],2)],1)],1)},n=[],r={name:"CardBase"},o=r,s=a("2877"),c=a("f09f"),m=a("a370"),l=a("eebe"),d=a.n(l),f=Object(s["a"])(o,i,n,!1,null,null,null);e["a"]=f.exports;d()(f,"components",{QCard:c["a"],QCardSection:m["a"]})}}]);