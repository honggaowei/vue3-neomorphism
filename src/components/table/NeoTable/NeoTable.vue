<template>
  <div 
    ref="tableRef"
    class="neo-table-container neomorphic" 
    :class="{ 
      'with-border': border,
      'with-column-border': columnBorder 
    }"
  >
    <div class="neo-table-wrapper" :class="{ 'has-fixed-column': hasFixedColumn }">
      <table class="neo-table" :style="tableStyles">
        <colgroup>
          <col v-if="selectable" width="50">
          <col v-for="(column, index) in columns" :key="index" :width="column.width">
        </colgroup>
        <thead>
          <tr>
            <th v-if="selectable" class="selection-column">
              <NeoCheckbox 
                :modelValue="isAllSelected" 
                :indeterminate="isIndeterminate"
                @update:modelValue="handleSelectAll" 
              />
            </th>
            <th
              v-for="(column, index) in columns"
              :key="column.prop"
              :class="{
                'fixed-left': column.fixed === 'left',
                'fixed-right': column.fixed === 'right',
                'sortable': column.sortable,
                'resizable': resizable && !column.fixed
              }"
              :style="getColumnStyle(column)"
            >
              <div class="th-content" @click="handleSort(column)">
                {{ column.label }}
                <div v-if="column.sortable" class="sort-icons">
                  <el-icon :class="{ active: sortState.prop === column.prop && sortState.order === 'asc' }">
                    <CaretTop />
                  </el-icon>
                  <el-icon :class="{ active: sortState.prop === column.prop && sortState.order === 'desc' }">
                    <CaretBottom />
                  </el-icon>
                </div>
              </div>
              <div 
                v-if="resizable && !column.fixed" 
                class="resize-handle"
                @mousedown="startResize($event, index)"
              ></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in displayData" :key="index">
            <td v-if="selectable" class="selection-column">
              <NeoCheckbox 
                v-model="selectedRows" 
                :value="row"
                @update:modelValue="(val) => handleSelect(val, row)"
              />
            </td>
            <td
              v-for="column in columns"
              :key="column.prop"
              :class="{
                'fixed-left': column.fixed === 'left',
                'fixed-right': column.fixed === 'right'
              }"
              :style="getColumnStyle(column)"
            >
              <slot :name="column.prop" :row="row" :index="index">
                {{ row[column.prop] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="pagination" class="neo-table-pagination">
      <div class="pagination-info">
        共 {{ total }} 条
      </div>
      <div class="pagination-buttons">
        <NeoButton size="small" :disabled="currentPage === 1" @click="handlePageChange(1)">
          首页
        </NeoButton>
        <NeoButton 
          size="small" 
          :disabled="currentPage === 1"
          @click="handlePageChange(currentPage - 1)"
        >
          上一页
        </NeoButton>
        <div class="page-jump">
          <span>前往</span>
          <input
            type="number"
            v-model.number="jumpPage"
            min="1"
            :max="totalPages"
            class="page-input neomorphic"
            @keyup.enter="handleJumpPage"
          />
          <span>页</span>
        </div>
        <NeoButton 
          size="small" 
          :disabled="currentPage === totalPages"
          @click="handlePageChange(currentPage + 1)"
        >
          下一页
        </NeoButton>
        <NeoButton size="small" :disabled="currentPage === totalPages" @click="handlePageChange(totalPages)">
          末页
        </NeoButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, PropType, watch, onBeforeUnmount, reactive, onMounted } from 'vue'
import NeoCheckbox from '@/components/form/NeoCheckbox/NeoCheckbox.vue'
import NeoButton from '@/components/base/NeoButton/NeoButton.vue'

interface TableColumn {
  prop: string
  label: string
  width?: number | string
  fixed?: 'left' | 'right'
  sortable?: boolean
}

export default defineComponent({
  name: 'NeoTable',
  components: { NeoCheckbox, NeoButton },
  props: {
    columns: {
      type: Array as PropType<TableColumn[]>,
      required: true
    },
    data: {
      type: Array as PropType<any[]>,
      required: true
    },
    selectable: Boolean,
    pagination: Boolean,
    pageSize: {
      type: Number,
      default: 10
    },
    border: {
      type: Boolean,
      default: false
    },
    resizable: {
      type: Boolean,
      default: false
    },
    columnBorder: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select', 'sort', 'page-change'],
  setup(props, { emit }) {
    const selectedRows = ref<any[]>([])
    const currentPage = ref(1)
    const sortState = ref({ prop: '', order: '' })
    const jumpPage = ref(1)

    // 为每个表格实例创建独立的列状态
    const columnsState = reactive<TableColumn[]>(
      JSON.parse(JSON.stringify(props.columns)).map((col: TableColumn) => ({
        ...col,
        width: col.width || 100
      }))
    )

    const tableStyles = computed(() => ({
      tableLayout: 'fixed', // 始终使用 fixed 布局
      width: '100%'
    }))

    // 获取表格容器的宽度
    const tableRef = ref<HTMLElement | null>(null)
    const tableWidth = ref(0)

    onMounted(() => {
      if (tableRef.value) {
        tableWidth.value = tableRef.value.offsetWidth
      }
    })

    const hasFixedColumn = computed(() => 
      columnsState.some(col => col.fixed === 'left' || col.fixed === 'right')
    )

    const total = computed(() => props.data.length)
    const totalPages = computed(() => Math.ceil(total.value / props.pageSize))

    const sortedData = computed(() => {
      if (!sortState.value.prop) return props.data
      
      return [...props.data].sort((a, b) => {
        const prop = sortState.value.prop
        const order = sortState.value.order === 'asc' ? 1 : -1
        return a[prop] > b[prop] ? order : -order
      })
    })

    const displayData = computed(() => {
      if (!props.pagination) return sortedData.value
      
      const start = (currentPage.value - 1) * props.pageSize
      return sortedData.value.slice(start, start + props.pageSize)
    })

    const isAllSelected = computed(() => {
      return displayData.value.length > 0 && 
        displayData.value.every(row => selectedRows.value.includes(row))
    })

    const isIndeterminate = computed(() => {
      return displayData.value.some(row => selectedRows.value.includes(row)) && 
        !isAllSelected.value
    })

    const allSelected = computed({
      get: () => selectedRows.value.length === displayData.value.length,
      set: (val) => handleSelectAll(val)
    })

    const handleSort = (column: TableColumn) => {
      if (!column.sortable) return
      
      if (sortState.value.prop === column.prop) {
        sortState.value.order = sortState.value.order === 'asc' ? 'desc' : 'asc'
      } else {
        sortState.value = { prop: column.prop, order: 'asc' }
      }
      
      emit('sort', sortState.value)
    }

    const handleSelect = (checked: boolean, row: any) => {
      if (checked) {
        selectedRows.value.push(row)
      } else {
        const index = selectedRows.value.indexOf(row)
        selectedRows.value.splice(index, 1)
      }
      emit('select', selectedRows.value)
    }

    const handleSelectAll = (checked: boolean) => {
      selectedRows.value = checked ? [...displayData.value] : []
      emit('select', selectedRows.value)
    }

    const handlePageChange = (page: number) => {
      currentPage.value = page
      emit('page-change', page)
    }

    const handleJumpPage = () => {
      const page = Math.min(Math.max(1, jumpPage.value), totalPages.value)
      handlePageChange(page)
    }

    const getColumnStyle = (column: TableColumn) => {
      const style: any = {}
      if (column.width) {
        style.width = typeof column.width === 'number' ? `${column.width}px` : column.width
      }
      return style
    }

    // 列宽调整相关
    const resizeState = ref({
      dragging: false,
      startX: 0,
      startWidth: 0,
      column: null as number | null
    })

    const startResize = (event: MouseEvent, columnIndex: number) => {
      event.stopPropagation()
      const column = columnsState[columnIndex]
      resizeState.value = {
        dragging: true,
        startX: event.clientX,
        startWidth: typeof column.width === 'number' ? column.width : parseInt(column.width as string),
        column: columnIndex
      }
      document.addEventListener('mousemove', handleResize)
      document.addEventListener('mouseup', stopResize)
    }

    const handleResize = (event: MouseEvent) => {
      if (!resizeState.value.dragging || !tableRef.value) return
      
      const diff = event.clientX - resizeState.value.startX
      const minWidth = 50
      const maxWidth = tableWidth.value - 
        columnsState.reduce((sum, col, index) => 
          index !== resizeState.value.column ? sum + (typeof col.width === 'number' ? col.width : parseInt(col.width as string)) : sum
        , 0) - 
        (props.selectable ? 50 : 0)

      if (resizeState.value.column !== null) {
        const newWidth = Math.min(
          Math.max(minWidth, resizeState.value.startWidth + diff),
          maxWidth
        )
        columnsState[resizeState.value.column].width = newWidth
      }
    }

    const stopResize = () => {
      resizeState.value.dragging = false
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', stopResize)
    }

    // Cleanup
    onBeforeUnmount(() => {
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', stopResize)
    })

    watch(() => props.data, () => {
      currentPage.value = 1
      selectedRows.value = []
    })

    watch(currentPage, (val) => {
      jumpPage.value = val
    })

    return {
      selectedRows,
      allSelected,
      isAllSelected,
      isIndeterminate,
      currentPage,
      total,
      totalPages,
      sortState,
      displayData,
      hasFixedColumn,
      handleSort,
      handleSelect,
      handleSelectAll,
      handlePageChange,
      handleJumpPage,
      jumpPage,
      getColumnStyle,
      startResize,
      tableStyles,
      columns: columnsState,
      tableRef
    }
  }
})
</script>

<style scoped>
.neo-table-container {
  width: 100%;
  overflow: hidden;
}

.neo-table-wrapper {
  width: 100%;
  overflow-x: auto;
  position: relative;
  background: var(--primary-bg);
}

.neo-table {
  min-width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}

.neo-table th,
.neo-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--shadow-dark);
}

.neo-table td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.neo-table th {
  font-weight: 600;
  color: var(--text-primary);
  background: var(--primary-bg);
}

.th-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sortable {
  cursor: pointer;
}

.sort-icons {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sort-icons .el-icon {
  font-size: 12px;
  opacity: 0.5;
}

.sort-icons .el-icon.active {
  opacity: 1;
  color: var(--button-color);
}

.fixed-left {
  position: sticky;
  left: 0;
  z-index: 2;
  background: var(--primary-bg);
}

.fixed-right {
  position: sticky;
  right: 0;
  z-index: 2;
  background: var(--primary-bg);
}

.selection-column {
  width: 50px;
  text-align: center;
}

.neo-table-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-top: 1px solid var(--shadow-dark);
}

.pagination-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-number {
  color: var(--text-primary);
}

.with-border {
  border: 1px solid var(--shadow-dark);
  border-radius: 8px;
}

.with-border .neo-table th,
.with-border .neo-table td {
  border: 1px solid var(--shadow-dark);
}

.resizable {
  position: relative;
  padding-right: 20px !important;
}

.resize-handle {
  position: absolute;
  top: 0;
  right: -3px;
  bottom: 0;
  width: 6px;
  background: transparent;
  cursor: col-resize;
  z-index: 3;
  transition: background-color 0.2s;
}

.resize-handle:hover,
.resize-handle:active {
  background: var(--shadow-dark);
}

.neo-table th {
  position: relative;
  padding-right: 24px;
}

.with-column-border .neo-table td,
.with-column-border .neo-table th {
  border-right: 1px solid var(--shadow-dark);
}

.with-column-border .neo-table td:last-child,
.with-column-border .neo-table th:last-child {
  border-right: none;
}

.page-jump {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 12px;
}

.page-input {
  width: 50px;
  height: 24px;
  text-align: center;
  border: none;
  border-radius: 4px;
  background: var(--primary-bg);
  color: var(--text-primary);
  padding: 0 4px;
}

.page-input::-webkit-inner-spin-button,
.page-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
