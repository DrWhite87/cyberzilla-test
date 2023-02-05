<script setup>
import MThead from "./MThead.vue";
import MTBody from "./MTBody.vue";
import MTPagination from "./MTPagination.vue";
import {computed, useSlots} from 'vue';

const props = defineProps({
    resources: {
        type: Object,
        required: false,
        default: () => {
            return {};
        },
    },
    paginatorLimit: {
        type: Number,
        required: false,
        default: () => {
            return 3;
        },
    },
    sort: {
        type: String,
        required: false,
        default: () => {
            return '';
        },
    },
    rowClass: {
        type: [String, Object],
        required: false,
        default: () => {
            return {};
        },
    },
});

const slots = useSlots();

const columns = computed(() => {
    let result = [];

    if (slots.default) {
        slots.default().forEach(item => {
            result.push(item);
        })
    }

    return result;
});

const emit = defineEmits(['clickRow', 'paginationChangePage', 'sortChange']);

const onClickRow = (row) => {
    emit('clickRow', row);
}

const onPaginationChangePage = (page) => {
    emit('paginationChangePage', page);
}

const onSortChange = (sortValue) => {
    emit('sortChange', sortValue);
};
</script>

<template>
    <div>
        <slot></slot>
        <table class="table">
            <MThead
                :columns="columns"
                :sort="sort"
                @sortChange="onSortChange"
            />
            <MTBody
                :columns="columns"
                :resources="resources.data"
                @clickRow="onClickRow"
                :rowClass="rowClass"
            />
        </table>
    </div>
    <MTPagination
        v-if="resources.links"
        class="MTPagination mt-6"
        :resources="resources"
        :limit="paginatorLimit"
        @paginationChangePage="onPaginationChangePage"
    />
</template>


<style scoped>

</style>
