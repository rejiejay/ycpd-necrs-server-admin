<!-- 这个组件就是用来跳转的, 但是通过 v-bind 多封装了个 过滤器, 目的是 过滤到 https?:|mailto:|tel 这几个属性的时候将 routwe-link 过滤为 <a></a> 链接 -->
<template>
    <!-- eslint-disable vue/require-component-is-->
    <component v-bind="linkProps(to)">
        <slot/>
    </component>
</template>

<script>

export default {
    props: {
        to: {
            type: String,
            required: true
        },
    },

    methods: {
        linkProps(url) {
            if (/^(https?:|mailto:|tel:)/.test(url)) {
                return {
                    is: 'a',
                    href: url,
                    target: '_blank',
                    rel: 'noopener'
                }
            }

            return {
                is: 'router-link',
                to: url
            }
        }
    }
}
</script>
