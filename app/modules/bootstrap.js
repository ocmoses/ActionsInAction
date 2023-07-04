"use client"

import _ from 'lodash';
import axios from 'axios';
import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
import { useEffect } from 'react';

// useEffect(() => {

    window._ = _;

    /**
     * We'll load the axios HTTP library which allows us to easily issue requests
     * to our Laravel back-end. This library automatically handles sending the
     * CSRF token as a header based on the value of the "XSRF" token cookie.
     */


    window.axios = axios;

    window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    /**
     * Echo exposes an expressive API for subscribing to channels and listening
     * for events that are broadcast by Laravel. Echo and event broadcasting
     * allows your team to easily build robust real-time web applications.
     */


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
