<script setup>
import {computed} from 'vue';

const props = defineProps({
    resources: {
        type: Object,
        required: false,
        default: () => {
            return {};
        },
    },
    limit: {
        type: Number,
        required: false,
        default: () => {
            return 5;
        },
    },
});

const emit = defineEmits(['paginationChangePage']);

const perPage = computed(() => props.resources.meta.per_page);
const total = computed(() => props.resources.meta.total);

const getPageFromUrl = (url) => {
    try {
        let urlObj = new URL(url);
        return parseInt(urlObj.searchParams.get('page'));
    }catch (e){
        return null;
    }
};
const selectPage = (page) => {
    const pageNum = getPageFromUrl(page.url);
    if (!Number.isInteger(pageNum)) {
        return;
    }

    emit('paginationChangePage', pageNum);
}
</script>

<template>
    <ul
        v-if="total > perPage"
        class="pagination">

        <li class="page-item pagination-page-nav" v-for="(page, key) in resources.links" :key="key" :class="{ 'active': page.active }">
            <a class="page-link text-secondary"
               :class="{'bg-dark': page.active, 'text-white': page.active, 'text-white': page.active, 'border-dark': page.active}"
               href
               @click.prevent="selectPage(page)"
               :aria-current="page.active ? 'page' : null" v-html="page.label"
            ></a>
        </li>
    </ul>
</template>
