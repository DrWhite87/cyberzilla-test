<template>
    <div v-if="status === 1" class="d-inline-block px-2 bg-primary text-white">New</div>
    <div v-else-if="status === 2" class="d-inline-block px-2 bg-info text-white">Processed</div>
    <div v-else-if="status === 3" class="d-inline-block px-2 bg-success text-white">Paid</div>
    <div v-else-if="status === 4" class="d-inline-block px-2 bg-danger text-white">Cancel</div>
</template>

<script>
export default {
    name: "PaymentStatus",
    props: {
        status: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
