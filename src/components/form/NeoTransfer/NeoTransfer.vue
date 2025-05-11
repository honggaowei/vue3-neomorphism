<template>
  <div class="neo-transfer">
    <div class="transfer-list neomorphic">
      <div class="transfer-header">
        <NeoCheckbox 
          :modelValue="leftCheckedAll"
          @update:modelValue="handleLeftCheckAll"
        >
          源列表 ({{ sourceData.length }})
        </NeoCheckbox>
      </div>
      <div class="transfer-body">
        <div
          v-for="item in sourceData"
          :key="item.value"
          class="transfer-item"
          :class="{ 'is-checked': leftChecked.includes(item.value) }"
        >
          <NeoCheckbox
            :modelValue="leftChecked.includes(item.value)"
            @update:modelValue="(val) => handleItemCheck(val, item, 'left')"
          >
            {{ item.label }}
          </NeoCheckbox>
        </div>
      </div>
    </div>

    <div class="transfer-operations">
      <NeoButton 
        icon="ArrowRight"
        :disabled="!leftChecked.length"
        @click="handleTransferToRight"
      />
      <NeoButton 
        icon="ArrowLeft"
        :disabled="!rightChecked.length"
        @click="handleTransferToLeft"
      />
    </div>

    <div class="transfer-list neomorphic">
      <div class="transfer-header">
        <NeoCheckbox 
          :modelValue="rightCheckedAll"
          @update:modelValue="handleRightCheckAll"
        >
          目标列表 ({{ targetData.length }})
        </NeoCheckbox>
      </div>
      <div class="transfer-body">
        <div
          v-for="item in targetData"
          :key="item.value"
          class="transfer-item"
          :class="{ 'is-checked': rightChecked.includes(item.value) }"
        >
          <NeoCheckbox
            :modelValue="rightChecked.includes(item.value)"
            @update:modelValue="(val) => handleItemCheck(val, item, 'right')"
          >
            {{ item.label }}
          </NeoCheckbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import NeoCheckbox from '../NeoCheckbox/NeoCheckbox.vue'
import NeoButton from '../../base/NeoButton/NeoButton.vue'

interface TransferItem {
  label: string
  value: string | number
  disabled?: boolean
}

export default defineComponent({
  components: { NeoCheckbox, NeoButton },
  props: {
    data: {
      type: Array as PropType<TransferItem[]>,
      required: true
    },
    modelValue: {
      type: Array as PropType<(string | number)[]>,
      default: () => []
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const leftChecked = ref<(string | number)[]>([])
    const rightChecked = ref<(string | number)[]>([])

    const sourceData = computed(() => 
      props.data.filter(item => !props.modelValue.includes(item.value))
    )

    const targetData = computed(() => 
      props.data.filter(item => props.modelValue.includes(item.value))
    )

    const leftCheckedAll = computed(() => 
      sourceData.value.length > 0 && leftChecked.value.length === sourceData.value.length
    )

    const rightCheckedAll = computed(() => 
      targetData.value.length > 0 && rightChecked.value.length === targetData.value.length
    )

    const handleLeftCheckAll = (val: boolean) => {
      leftChecked.value = val ? sourceData.value.map(item => item.value) : []
    }

    const handleRightCheckAll = (val: boolean) => {
      rightChecked.value = val ? targetData.value.map(item => item.value) : []
    }

    const handleItemCheck = (checked: boolean, item: TransferItem, direction: 'left' | 'right') => {
      const targetChecked = direction === 'left' ? leftChecked : rightChecked
      if (checked) {
        targetChecked.value.push(item.value)
      } else {
        const index = targetChecked.value.indexOf(item.value)
        targetChecked.value.splice(index, 1)
      }
    }

    const handleTransferToRight = () => {
      const newValue = [...props.modelValue, ...leftChecked.value]
      emit('update:modelValue', newValue)
      leftChecked.value = []
    }

    const handleTransferToLeft = () => {
      const newValue = props.modelValue.filter(v => !rightChecked.value.includes(v))
      emit('update:modelValue', newValue)
      rightChecked.value = []
    }

    return {
      leftChecked,
      rightChecked,
      sourceData,
      targetData,
      leftCheckedAll,
      rightCheckedAll,
      handleLeftCheckAll,
      handleRightCheckAll,
      handleItemCheck,
      handleTransferToRight,
      handleTransferToLeft
    }
  }
})
</script>

<style scoped>
.neo-transfer {
  display: flex;
  align-items: center;
  gap: 20px;
}

.transfer-list {
  flex: 1;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  background: var(--primary-bg);
}

.transfer-header {
  padding: 12px;
  border-bottom: 1px solid var(--shadow-dark);
}

.transfer-body {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.transfer-item {
  padding: 8px;
  border-radius: 4px;
  transition: all 0.3s;
  position: relative;
  z-index: 1;
}

.transfer-item:hover {
  background: var(--shadow-light);
}

.transfer-item.is-checked {
  background: var(--shadow-light);
}

.transfer-operations {
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 2;
}
</style>
