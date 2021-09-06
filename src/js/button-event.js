import { fromEvent, Observable } from 'rxjs';

const button = document.getElementById('console-btn');

// 热更新不能够解绑事件
fromEvent(button, 'click').subscribe((ev) => {
	console.log(ev);
});

const someObservable = new Observable(subscriber => {
	subscriber.next(1);
	subscriber.next(2);
	subscriber.next(3);
	setTimeout(() => {
		subscriber.next(4);
		subscriber.complete();
		console.log(subscriber);
	}, 1000);
});

console.log('just before subscribe');
someObservable.subscribe({
	next (x) { console.log('got value ' + x); },
	error (err) { console.error('something wrong occurred: ' + err); },
	complete () { console.log('done'); }
});
console.log('just after subscribe');