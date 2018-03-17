function Batcher () {
  this.reset();
}

Batcher.prototype = {
  constructor: Batcher,
  reset: function(){
    this.has = {};
    this.queue = [];
    this.waiting = false;
  },
  push: function(job){
    if(!this.has[job.name]){
      this.queue.push(job);
      this.has[job.name] = job;
      if(!this.waiting){
        this.waiting = true;
        //主线程不忙的时候执行更新
        setTimeout(()=>{
          this.flush();
        })
      }
    }
  },
  flush: function(){
    this.queue.forEach((job)=>{
      job.cb();
    })
    this.reset();
  }
}
