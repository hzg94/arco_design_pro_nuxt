<template>
  <div class="container">
    <BreadCrumb :items="['列表页', '查询表格']"/>
    <a-card class="general-card" title="搜索表格">
      <a-row>
        <a-col :flex="1">
          <a-form
              :label-col-props="{ span: 6 }"
              :model="formModel"
              :wrapper-col-props="{ span: 18 }"
              label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                    field="number"
                    label="编号"
                >
                  <a-input
                      v-model="formModel.number"
                      placeholder="请输入编号"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" label="名称">
                  <a-input
                      v-model="formModel.name"
                      placeholder="请输入名称"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    field="contentType"
                    label="内容类型"
                >
                  <a-select
                      v-model="formModel.contentType"
                      :options="contentTypeOptions"
                      placeholder="请选择"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    field="filterType"
                    label="过滤类型"
                >
                  <a-select
                      v-model="formModel.filterType"
                      :options="filterTypeOptions"
                      placeholder="请选择"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    field="createdTime"
                    label="创建时间"
                >
                  <a-range-picker
                      v-model="formModel.createdTime"
                      style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                    field="status"
                    label="状态"
                >
                  <a-select
                      v-model="formModel.status"
                      :options="statusOptions"
                      placeholder="请选择"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider direction="vertical" style="height: 84px"/>
        <a-col :flex="'86px'" style="text-align: right">
          <a-space :size="18" direction="vertical">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search/>
              </template>
              搜索
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh/>
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0"/>
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-plus/>
              </template>
              创建
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  导入
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col
            :span="12"
            style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download/>
            </template>
            下载
          </a-button>
          <a-tooltip content="刷新">
            <div class="action-icon" @click="search"
            >
              <icon-refresh size="18"
              />
            </div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip content="密度">
              <div class="action-icon">
                <icon-line-height size="18"/>
              </div>
            </a-tooltip>
            <template #content>
              <a-doption
                  v-for="item in densityList"
                  :key="item.value"
                  :class="{ active: item.value === size }"
                  :value="item.value"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip content="列设置">
            <a-popover
                position="bl"
                trigger="click"
                @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon">
                <icon-settings size="18"/>
              </div>
              <template #content>
                <div id="tableSetting">
                  <div
                      v-for="(item, index) in showColumns"
                      :key="item.dataIndex"
                      class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow/>
                    </div>
                    <div>
                      <a-checkbox
                          v-model="item.checked"
                          @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <ClientOnly>
        <a-table
            :bordered="false"
            :columns="(cloneColumns as TableColumnData[])"
            :data="renderData"
            :loading="loading"
            :pagination="pagination"
            :size="size"
            row-key="id"
            @page-change="onPageChange"
        >
          <template #index="{ rowIndex }">
            {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
          </template>
          <template #contentType="{ record }">
            <a-space>
              <a-avatar
                  v-if="record.contentType === 'img'"
                  :size="16"
                  shape="square"
              >
                <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image"
                />
              </a-avatar>
              <a-avatar
                  v-else-if="record.contentType === 'horizontalVideo'"
                  :size="16"
                  shape="square"
              >
                <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image"
                />
              </a-avatar>
              <a-avatar v-else :size="16" shape="square">
                <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image"
                />
              </a-avatar>
              {{
                record.contentType === 'img' ? '图片' : record.contentType === 'horizontalVideo' ? '水平视频' : '垂直视频'
              }}
            </a-space>
          </template>
          <template #filterType="{ record }">
            {{ record.filterType === 'artificial' ? '人工' : record.filterType === 'rules' ? '规则' : '' }}
          </template>
          <template #status="{ record }">
            <span v-if="record.status === 'offline'" class="circle"></span>
            <span v-else class="circle pass"></span>
            {{ record.status === 'online' ? '在线' : '离线' }}
          </template>
          <template #operations>
            <a-button v-permission="['admin']" size="small" type="text">
              查看
            </a-button>
          </template>
        </a-table>
      </ClientOnly>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import type {SelectOptionData} from '@arco-design/web-vue/es/select/interface';
import type {TableColumnData} from '@arco-design/web-vue/es/table/interface';
import type {PolicyParams, PolicyRecord} from "~/server/api/queryPolicyList";
import type {Pagination} from '~/types/global'
import cloneDeep from 'lodash/cloneDeep';
import Sortable from 'sortablejs';


definePageMeta({
  icon: 'icon-list',
  title: '搜索表格',
  requiresAuth: true,
  order: 3,
})

type SizeProps = 'mini' | 'small' | 'medium' | 'large';
type Column = TableColumnData & { checked?: true };

const generateFormModel = () => {
  return {
    number: '',
    name: '',
    contentType: '',
    filterType: '',
    createdTime: [],
    status: '',
  };
};

const {loading, setLoading} = useLoading(true);
const renderData = ref<PolicyRecord[]>([]);
const formModel = ref(generateFormModel());
const cloneColumns = ref<Column[]>([]);
const showColumns = ref<Column[]>([]);

const size = ref<SizeProps>('medium');

const basePagination: Pagination = {
  current: 1,
  pageSize: 20,
};

const pagination = reactive({
  ...basePagination,
});
const densityList = computed(() => [
  {
    name: '迷你',
    value: 'mini',
  },
  {
    name: '小',
    value: 'small',
  },
  {
    name: '中',
    value: 'medium',
  },
  {
    name: '大',
    value: 'large',
  },
]);
const columns = computed<TableColumnData[]>(() => [
  {
    title: '序号',
    dataIndex: 'index',
    slotName: 'index',
  },
  {
    title: '编号',
    dataIndex: 'number',
  },
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '内容类型',
    dataIndex: 'contentType',
    slotName: 'contentType',
  },
  {
    title: '过滤类型',
    dataIndex: 'filterType',
  },
  {
    title: '数量',
    dataIndex: 'count',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
  },
  {
    title: '状态',
    dataIndex: 'status',
    slotName: 'status',
  },
  {
    title: '操作',
    dataIndex: 'operations',
    slotName: 'operations',
  },
]);
const contentTypeOptions = computed<SelectOptionData[]>(() => [
  {
    label: '图片',
    value: 'img',
  },
  {
    label: '水平视频',
    value: 'horizontalVideo',
  },
  {
    label: '垂直视频',
    value: 'verticalVideo',
  },
]);
const filterTypeOptions = computed<SelectOptionData[]>(() => [
  {
    label: '人工',
    value: 'artificial',
  },
  {
    label: '规则',
    value: 'rules',
  },
]);
const statusOptions = computed<SelectOptionData[]>(() => [
  {
    label: '在线',
    value: 'online',
  },
  {
    label: '离线',
    value: 'offline',
  },
]);
const fetchData = async (
    params: PolicyParams = {current: 1, pageSize: 20}
) => {
  setLoading(true);
  try {
    const {data} = await useFetch('/api/queryPolicyList', {
      params: params
    })
    if (data.value) {
      renderData.value = data.value?.data.list;
      pagination.current = params.current;
      pagination.total = data.value?.data.total;
    }
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};

const search = () => {
  fetchData({
    ...basePagination,
    ...formModel.value,
  } as unknown as PolicyParams);
};
const onPageChange = (current: number) => {
  fetchData({...basePagination, current});
};

fetchData();
const reset = () => {
  formModel.value = generateFormModel();
};

const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
) => {
  size.value = val as SizeProps;
};

const handleChange = (
    checked: boolean | (string | boolean | number)[],
    column: Column,
    index: number
) => {
  if (!checked) {
    cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
    );
  } else {
    cloneColumns.value.splice(index, 0, column);
  }
};

const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
): T => {
  const newArray = isDeep ? cloneDeep(array) : array;
  if (beforeIdx > -1 && newIdx > -1) {
    // 先替换后面的，然后拿到替换的结果替换前面的
    newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
    );
  }
  return newArray;
};

const popupVisibleChange = (val: boolean) => {
  if (val) {
    nextTick(() => {
      const el = document.getElementById('tableSetting') as HTMLElement;
      const sortable = new Sortable(el, {
        onEnd(e: any) {
          const {oldIndex, newIndex} = e;
          exchangeArray(cloneColumns.value, oldIndex, newIndex);
          exchangeArray(showColumns.value, oldIndex, newIndex);
        },
      });
    });
  }
};

watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    {deep: true, immediate: true}
);
</script>

<style lang="less" scoped>
.container {
  padding: 0 20px 20px 20px;
}

:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}

.action-icon {
  margin-left: 12px;
  cursor: pointer;
}

.active {
  color: #0960bd;
  background-color: #e3f4fc;
}

.setting {
  display: flex;
  align-items: center;
  width: 200px;

  .title {
    margin-left: 12px;
    cursor: pointer;
  }
}
</style>
