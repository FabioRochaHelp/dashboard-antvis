(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{"6e5b":function(a,t,e){"use strict";e.r(t);var s=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("card-base",{ref:"cardBase"},[e("canvas",{attrs:{id:"f2basic"}})])},n=[],r=(e("28a5"),e("fc8b")),i=e("7424"),c={name:"F2Basic",components:{CardBase:r["a"]},data:function(){return{dataChart:[]}},mounted:function(){this.getCalls()},methods:{getCalls:function(){var a=this;i["a"].get("?service=CallsReport&username=admin&password=2018@efix&start_date=2021-09-01&start_hour=00:00&end_date=2021-09-30&end_hour=23:59&status_noanswer=true&status_answered=true&status_busy=true&status_failed=true&time_call_init=10&report_type=synthetic",{auth:{username:"admin",password:"2018@efix"}}).then((function(t){var e=[],s={};for(var n in t.data.calldate){var r=0;Object.hasOwnProperty.call(t.data.calldate,n)&&(r=n.split("/"),r=r[0],s={dia:r,total:t.data.calldate[n].TOTALS},e.push(s))}a.dataChart=e;var i=new a.$f2.Chart({id:"f2basic",pixelRatio:window.devicePixelRatio,height:300,width:a.$refs.cardBase.$el.offsetWidth-50});i.source(a.dataChart,{dia:{tickCount:10}}),i.axis("dia",{label:{fontSize:14}}),i.axis("total",{label:{fontSize:14}}),i.interval().position("dia*total").color("dia"),i.render()})).catch((function(a){return a}))}}},l=c,o=e("2877"),d=Object(o["a"])(l,s,n,!1,null,null,null);t["default"]=d.exports},7424:function(a,t,e){"use strict";var s=e("bc3a"),n=e.n(s),r=n.a.create({baseURL:"https://pabx.efixtelecom.com.br/snep/modules/default/api/",timeout:5e3});t["a"]=r},fc8b:function(a,t,e){"use strict";var s=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"col-md-6 col-lg-6 col-xs-12"},[e("q-card",[e("q-card-section",[a._t("default")],2)],1)],1)},n=[],r={name:"CardBase"},i=r,c=e("2877"),l=e("f09f"),o=e("a370"),d=e("eebe"),u=e.n(d),f=Object(c["a"])(i,s,n,!1,null,null,null);t["a"]=f.exports;u()(f,"components",{QCard:l["a"],QCardSection:o["a"]})}}]);