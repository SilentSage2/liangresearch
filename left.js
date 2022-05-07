//©Xara Ltd
var clicked="";
var gtype=".gif";
var selstate="_over";
if (typeof(loc)=="undefined" || loc==""){
    var loc="";
    if (document.body&&document.body.innerHTML){
        var tt=document.body.innerHTML;
        var ml=tt.match(/["']([^'"]*)left.js["']/i);
        if(ml && ml.length > 1) loc=ml[1];
    }
}
document.write("<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr>");
tr(false);
writeButton(loc,"index.html","img/left_b1",140,30,"HOME","",0);
writeButton(loc,"people.html","img/left_b2",140,30,"PEOPLE","",0);
writeButton(loc,"research.html","img/left_b3",140,30,"RESEARCH","",0);
writeButton(loc,"publications_award.html","img/left_b4",140,30,"PUBLICATION","",0);
writeButton(loc,"software.html","img/left_b5",140,30,"SOFTWARE","",0);
writeButton(loc,"links.html","img/left_b6",140,30,"LINKS","",0);
writeButton(loc,"events.html","img/left_b7",140,30,"EVENTS","",0);
writeButton(loc,"photoalbum.html","img/left_b8",140,30,"PHOTO ALBUM","",0);
writeButton(loc,"contact.html","img/contact_info",140,40,"CONTACT US","",0);
tr(true);
document.write("</tr></table>");

document.write("<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\">");

// ---- outdated/broken ----
writeButton(loc,"interactive/index.shtml","img/mrinter_b1",138,30,"MR Interactive","",0);
// ---- fill with space instead ----
document.write("<tr><td>&nbsp;</td></tr>")
// ----

document.write("</table>");

loc="";


//______________________________________________________________________________
function tr(b){
    if (b) document.write("<tr>");
    else document.write("</tr>");
}


//______________________________________________________________________________
function turn_over(name) {
    if (document.images != null && clicked != name) {
        document[name].src = document[name+"_over"].src;
    }
}


//______________________________________________________________________________
function turn_off(name) {
    if (document.images != null && clicked != name) {
        document[name].src = document[name+"_off"].src;
    }
}


//______________________________________________________________________________
function reg(gname,name){
    if (document.images){
        document[name+"_off"] = new Image();
        document[name+"_off"].src = loc+gname+gtype;
        document[name+"_over"] = new Image();
        document[name+"_over"].src = loc+gname+"_over"+gtype;
    }
}


//______________________________________________________________________________
function evs(name){
   return " onmouseover=\"turn_over('"+ name + "')\" onmouseout=\"turn_off('"+ name + "')\""}
   

//______________________________________________________________________________
function writeButton(urld,url,name,w,h,alt,target,hsp){
    gname=name;
    while(typeof(document[name])!="undefined")name+="x";
    reg(gname,name);
    tr(true);
    document.write("<td>");
    if(alt!="")alt=" alt=\""+alt+"\"";
    if(target!="")target=" target=\""+target+"\"";
    if(w>0)w=" width=\""+w+"\"";
    else w="";
    if(h>0)h=" height=\""+h+"\"";
    else h="";
    var l=clicked!=""||!isCurrentFile(url);
    if(url!="")url=" href=\""+urld+url+"\"";
    if(l){
        if(typeof(clx)!="undefined"){
            target="";
            url=" href=\"?"+clx+"\"";
            alt=" alt=\"Click to edit\"";
        }
        document.write("<a "+url+evs(name)+target+">");
    }
    else gname+=selstate;
    gname+=gtype;
    if(hsp==-1)hsp=" align=\"right\"";
    else if(hsp>0)hsp=" hspace=\""+hsp+"\"";
    else hsp="";
    document.write("<img src=\""+loc+gname+"\" name=\""+name+"\""+w+h+alt+hsp+" border=\"0\" />");
    if(l)document.write("</a>");
    document.write("</td>");
    tr(false);
}


//______________________________________________________________________________
function syncFile(f,nf){
    var matches='home.html*index.html*welcome.html*default.asp';
    var p=f.lastIndexOf('/');
    var sf=f;
    if(p>=0)sf=f.substr(p+1,f.length-1);
    if(matches.indexOf(sf)==-1)return "";
    return sf;
}


//______________________________________________________________________________
function isCurrentFile(str){
    var p=str.lastIndexOf(':');
    if(p>0)str=str.substr(p+1,str.length-1);
    str=escape(str);
    str=str.toLowerCase();
    while(str.length>3&&str.substring(0,3)=="../")str=str.substr(3,str.length-1);
    var fstr=str.indexOf(".htm");
    if(fstr==-1)fstr=str.indexOf(".asp");
    if(fstr==-1)fstr=str.indexOf(".php");
    if(fstr==-1)fstr=str.indexOf(".jsp");
    if(fstr==-1)fstr=str.indexOf(".txt");
    if(fstr<1&&str.charAt(str.length-1)!='/')str+="/";
    var current=document.location.href.toLowerCase();
    p=current.lastIndexOf('?');
    if(p>0)current=current.substr(0,p);
    var fcurrent=current.indexOf(".htm");
    if(fcurrent==-1)fcurrent=current.indexOf(".asp");
    if(fcurrent==-1)fcurrent=current.indexOf(".php");
    if(fcurrent==-1)fcurrent=current.indexOf(".jsp");
    if(fcurrent==-1)fcurrent=current.indexOf(".txt");
    if(fcurrent<1&&current.charAt(current.length-1)!='/')current+="/";
    if(fstr!=-1&&fcurrent==-1)current+=syncFile(str,current);
    if(fstr==-1&&fcurrent!=-1)str+=syncFile(current,str);
    var currsize=current.length;
    var strsize=str.length;
    while(strsize>=0&&currsize>=0){
        if(current.charAt(currsize)!=str.charAt(strsize))return false;
        currsize=currsize-1;
        strsize=strsize-1;
    }
    return true;
}

