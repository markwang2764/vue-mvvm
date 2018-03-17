function Watcher(vm,node,name,type){
  Dep.target = this;
  this.name = name;
  this.node = node;
  this.vm = vm;
  this.type = type;
  this.update();
  Dep.target = null;
}

Watcher.prototype = {
  constructor: Watcher,
  update: function(){
    this.get();
    var batcher = new Batcher();
    batcher.push(this);
  },
  cb: function(){
    this.node[this.type] = this.value;
  },
  get: function(){
    this.value = this.vm[this.name];
  }
}
