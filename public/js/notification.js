function postNotification(type, message, position) {

  if (type === 'red') {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.style[position] = '5%'
    notification.innerHTML = `
    ${message}
    <svg class="notification" width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="27" stroke="#FC5A5A" stroke-width="2" />
      <svg width="56" height="56" viewBox="-20 -20 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M14.8512 2.45129C14.9367 2.36587 15.0046 2.26446 15.0509 2.15282C15.0972 2.04118 15.1211 1.92152 15.1212 1.80065C15.1213 1.67979 15.0975 1.56009 15.0514 1.4484C15.0052 1.33671 14.9374 1.2352 14.852 1.14969C14.7666 1.06417 14.6652 0.996313 14.5536 0.949992C14.4419 0.90367 14.3223 0.87979 14.2014 0.879716C14.0805 0.879642 13.9608 0.903374 13.8491 0.949559C13.7374 0.995743 13.6359 1.06347 13.5504 1.14889L8.00002 6.69929L2.45123 1.14889C2.27852 0.976177 2.04427 0.87915 1.80003 0.87915C1.55578 0.87915 1.32153 0.976177 1.14883 1.14889C0.976116 1.3216 0.879089 1.55584 0.879089 1.80009C0.879089 2.04433 0.976116 2.27858 1.14883 2.45129L6.69922 8.00009L1.14883 13.5489C1.06331 13.6344 0.995473 13.7359 0.949191 13.8477C0.90291 13.9594 0.879089 14.0791 0.879089 14.2001C0.879089 14.321 0.90291 14.4408 0.949191 14.5525C0.995473 14.6642 1.06331 14.7658 1.14883 14.8513C1.32153 15.024 1.55578 15.121 1.80003 15.121C1.92096 15.121 2.04072 15.0972 2.15245 15.0509C2.26419 15.0046 2.36571 14.9368 2.45123 14.8513L8.00002 9.30089L13.5504 14.8513C13.7231 15.0238 13.9573 15.1206 14.2014 15.1205C14.4455 15.1203 14.6795 15.0232 14.852 14.8505C15.0245 14.6778 15.1213 14.4436 15.1212 14.1995C15.121 13.9554 15.0239 13.7214 14.8512 13.5489L9.30082 8.00009L14.8512 2.45129Z"
          fill="#FC5A5A" />
      </svg>
    </svg>`
    document.body.appendChild(notification);
    setTimeout(function () {
      notification.style.display = 'none';
    },3000);

  }
  if (type === 'green') {
    const notification = document.createElement('div')
    notification.classList.add('notification')
    notification.style[position] = '5%'
    notification.innerHTML = `
    
        ${message}
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="27" stroke="#82C43C" stroke-width="2" />
          <svg width="56" height="56" viewBox="-20 -20 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7L7 13L17 1" stroke="#82C43C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      
        </svg>
      `
    document.body.appendChild(notification);
    setTimeout(function () {
      notification.style.display = 'none';
    }, 3000);


  }
}


