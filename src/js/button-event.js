import { fromEvent } from 'rxjs';

const button = document.getElementById('console-btn');

// 热更新不能够解绑事件
fromEvent(button, 'click').subscribe((ev) => {
	console.log(ev);
});
