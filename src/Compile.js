function Compile(node,vm){
  if(node){
    this.$frag = this.nodeToFragment(node,vm);
    return this.$frag;
  }
}
Compile.prototype = {
  nodeToFragment: function(node,vm) {
    var self = this;
    var frag = document.createDocumentFragment();
    var child;
    console.log(node.firstChild);
    while(child = node.firstChild) {
      console.log(node.firstChild);
      self.compileElement(child,vm);
      frag.append(child);
    }
    return frag;
  },
  compileElement: function(node,vm){
    var reg = /\{\{(.*)\}\}/;
    if(node.nodeType === 1){
      var attr = node.attributes;
      console.log(attr);
      for(var i = 0;i < attr.length; i++){
        if(attr[i].name == 'v-model'){
          var name = attr[i].value;
          node.addEventListener('input',function(e){
            vm[name] = e.target.value;
          })
          new Watcher(vm,node,name,'value')
        }
      }
    }
    if(node.nodeType === 3){
      if(reg.test(node.nodeValue)){
        var name = RegExp.$1;
        console.log(name);
        name=name.trim();
        new Watcher(vm,node,name,'nodeValue');
      }
    }
  }
}
