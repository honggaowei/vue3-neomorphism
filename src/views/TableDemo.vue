<template>
  <div class="table-demo">
    <h2>表格演示</h2>

    <section class="demo-section">
      <h3>基础表格</h3>
      <NeoTable :columns="basicColumns" :data="tableData" />
    </section>

    <section class="demo-section">
      <h3>可选择表格</h3>
      <NeoTable 
        :columns="basicColumns" 
        :data="tableData" 
        selectable
        @select="handleSelect"
      />
    </section>

    <section class="demo-section">
      <h3>可排序表格</h3>
      <NeoTable 
        :columns="sortableColumns" 
        :data="tableData"
        @sort="handleSort"
      />
    </section>

    <section class="demo-section">
      <h3>固定列表格</h3>
      <NeoTable :columns="fixedColumns" :data="tableData" />
    </section>

    <section class="demo-section">
      <h3>分页表格</h3>
      <NeoTable 
        :columns="basicColumns" 
        :data="largeTableData"
        pagination
        :page-size="5"
        @page-change="handlePageChange"
      />
    </section>

    <section class="demo-section">
      <h3>列宽可调整表格</h3>
      <NeoTable 
        :columns="resizableColumns" 
        :data="tableData"
        border
        columnBorder
        resizable
        pagination
        :page-size="5"
        @page-change="handlePageChange"
      />
    </section>

    <section class="demo-section">
      <h3>固定宽度可调整列表格</h3>
      <div style="width: 800px">
        <NeoTable 
          :columns="resizableColumns" 
          :data="tableData"
          border
          columnBorder
          resizable
          pagination
          :page-size="5"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NeoTable from '@/components/table/NeoTable/NeoTable.vue'

export default defineComponent({
  components: { NeoTable },
  setup() {
    const basicColumns = [
      { prop: 'name', label: '姓名' },
      { prop: 'age', label: '年龄' },
      { prop: 'address', label: '地址' }
    ]

    const sortableColumns = [
      { prop: 'name', label: '姓名', sortable: true },
      { prop: 'age', label: '年龄', sortable: true },
      { prop: 'address', label: '地址' }
    ]

    const fixedColumns = [
      { prop: 'name', label: '姓名', fixed: 'left', width: 100 },
      { prop: 'age', label: '年龄', width: 80 },
      { prop: 'email', label: '邮箱', width: 200 },
      { prop: 'phone', label: '电话', width: 150 },
      { prop: 'address', label: '地址', width: 300 },
      { prop: 'actions', label: '操作', fixed: 'right', width: 120 }
    ]

    const resizableColumns = [
      { prop: 'name', label: '姓名', width: 120 },
      { prop: 'age', label: '年龄', width: 100 },
      { prop: 'email', label: '邮箱', width: 200 },
      { prop: 'phone', label: '电话', width: 150 },
      { prop: 'address', label: '地址', width: 250 },
      { prop: 'description', label: '描述', width: 300 }
    ]

    const tableData = ref([
      { name: '张三', age: 25, address: '北京市', email: 'zhangsan@example.com', phone: '13800138000' },
      { name: '李四', age: 30, address: '上海市', email: 'lisi@example.com', phone: '13800138001' },
      { name: '王五', age: 28, address: '广州市', email: 'wangwu@example.com', phone: '13800138002' }
    ])

    const largeTableData = ref(Array.from({ length: 50 }, (_, i) => ({
      name: `用户${i + 1}`,
      age: 20 + Math.floor(Math.random() * 40),
      email: `user${i + 1}@example.com`,
      phone: `1380013${String(i).padStart(4, '0')}`,
      address: ['北京市', '上海市', '广州市', '深圳市'][Math.floor(Math.random() * 4)],
      description: `这是第 ${i + 1} 号用户的详细描述信息...`
    })))

    const handleSelect = (selected: any[]) => {
      console.log('已选择:', selected)
    }

    const handleSort = (sort: { prop: string, order: string }) => {
      console.log('排序:', sort)
    }

    const handlePageChange = (page: number) => {
      console.log('当前页:', page)
    }

    return {
      basicColumns,
      sortableColumns,
      fixedColumns,
      resizableColumns,
      tableData,
      largeTableData,
      handleSelect,
      handleSort,
      handlePageChange
    }
  }
})
</script>

<style scoped>
.table-demo {
  padding: 0;
  background: var(--primary-bg);
  min-height: 100%;
}

.demo-section {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.demo-section h3 {
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.demo-section + .demo-section {
  border-top: 1px solid var(--shadow-dark);
}

h2 {
  padding: var(--spacing-lg);
  margin: 0;
  border-bottom: 1px solid var(--shadow-dark);
}
</style>
