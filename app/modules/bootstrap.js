"use client"

import _ from 'lodash';
import axios from 'axios';
import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
import { useEffect } from 'react';

// useEffect(() => {
    window._ = _;

    window.axios = axios;

    window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    window.Pusher = Pusher;

    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.NEXT_PUBLIC_MIX_PUSHER_APP_KEY,
        cluster: process.env.NEXT_PUBLIC_MIX_PUSHER_APP_CLUSTER,
        wsHost: process.env.NEXT_PUBLIC_VITE_PUSHER_HOST,
        wsPort: 6001,
        wssPort: process.env.NEXT_PUBLIC_VITE_PUSHER_PORT,
        forceTLS: false,
        encrypted: false,
        enabledTransports: ['ws', 'wss']
    });

    const channel = window.Echo.channel('public.notification');

    channel.subscribed(()=>{
        console.log('subscribed!');
    }).listen('.notification', (event)=>{
        console.log('Notification event', event);
    });

// }, []);
