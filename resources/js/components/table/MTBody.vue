<script setup>
defineProps({
    columns: {
        type: Array,
        required: true,
        default: () => {
            return [];
        },
    },
    resources: {
        type: Array,
        required: true,
        default: () => {
            return [];
        },
    },
    rowClass: {
        type: [String, Object],
        required: false,
        default: () => {
            return {};
        },
    },
})

const emit = defineEmits(['clickRow']);

const onClickRow = (row) => {
    emit('clickRow', row);
}

</script>

<template>
    <tbody>
    <tr
        v-for="(row, rowIndex) in resources"
    >
        <td
            v-for="(column, columnIndex) in columns"
            @click="onClickRow(row)"
            :class="rowClass"
        >
            <component v-if="column.children && column.children.body" :is="column.children.body" :row="row" :column="column" :attribute="column.props.attribute" :label="column.props.label"/>
            <template v-else>
                {{ row[column.props.attribute] }}
            </template>
        </td>
    </tr>
    </tbody>
</template>

<style scoped>

</style>
