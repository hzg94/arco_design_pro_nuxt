<template>
  <div class="container">
    <BreadCrumb :items="['表单', '分组表单']"/>
    <a-form ref="formRef" :model="formData" layout="vertical">
      <a-space :size="16" direction="vertical">
        <a-card class="general-card">
          <template #title>
            视频参数
          </template>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                  field="video.mode"
                  label="匹配模式"
              >
                <a-select placeholder="请选择">
                  <a-option value="custom">自定义</a-option>
                  <a-option value="mode1">模式1</a-option>
                  <a-option value="mode2">模式2</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                  field="video.acquisition.resolution"
                  label="视频采集分辨率"
              >
                <a-select
                    placeholder="请选择视频采集分辨率"
                >
                  <a-option value="resolution1">分辨率1</a-option>
                  <a-option value="resolution2">分辨率2</a-option>
                  <a-option value="resolution3">分辨率3</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                  field="video.acquisition.frameRate"
                  label="视频采集帧率"
              >
                <a-input
                    placeholder="请输入视频采集帧率"
                >
                  <template #append> fps</template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                  field="video.encoding.resolution"
                  label="视频编码分辨率"
              >
                <a-select
                    placeholder="请选择视频编码分辨率"
                >
                  <a-option value="resolution1">分辨率1</a-option>
                  <a-option value="resolution2">分辨率2</a-option>
                  <a-option value="resolution3">分辨率3</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                  label="视频编码最小码率"
                  field="video.encoding.rate.min"
              >
                <a-input
                    add-after="bps"
                    placeholder="请输入视频编码最小码率"
                >
                  <template #append> bps</template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                  label="视频编码最大码率"
                  field="video.encoding.rate.max"
              >
                <a-input
                    placeholder="请输入视频编码最大码率"
                >
                  <template #append> bps</template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                  label="视频编码默认码率"
                  field="video.encoding.rate.default"
              >
                <a-input
                    placeholder="请输入视频编码默认码率"
                >
                  <template #append> bps</template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                  label="视频编码帧率"
                  field="video.encoding.frameRate"
              >
                <a-input
                    placeholder="请输入视频编码帧率"
                >
                  <template #append> fps</template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                  label="视频编码配置文件"
                  field="video.encoding.profile"
              >
                <a-input
                    placeholder="请输入视频编码配置文件"
                >
                  <template #append> bps</template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card class="general-card">
          <template #title>
            音频参数
          </template>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                  label="匹配模式"
                  field="audio.mode"
              >
                <a-select placeholder="请选择">
                  <a-option value="custom">自定义</a-option>
                  <a-option value="mode1">模式1</a-option>
                  <a-option value="mode2">模式2</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                  label="音频采集声道数"
                  field="audio.acquisition.channels"
              >
                <a-select
                    placeholder="请选择音频采集声道数"
                >
                  <a-option value="1">1</a-option>
                  <a-option value="2">2</a-option>
                  <a-option value="3">3</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                  label="音频编码声道数"
                  field="audio.encoding.channels"
              >
                <a-input
                    placeholder="请输入音频编码声道数"
                >
                  <template #append> bps</template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                  label="音频编码码率"
                  field="audio.encoding.rate"
              >
                <a-input
                    placeholder="请输入音频编码码率"
                >
                  <template #append> bps</template>
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item
                  label="音频编码配置文件"
                  field="audio.encoding.profile"
              >
                <a-input
                    placeholder="请输入音频编码配置文件"
                >
                  <template #append> fps</template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card :bordered="false" class="general-card">
          <template #title>
            填写说明
          </template>
          <a-form-item
              label="参数描述"
              field="audio.approvers"
          >
            <a-textarea
                placeholder="请填写参数说明，最多不超多200字。"
            />
          </a-form-item>
        </a-card>
      </a-space>
      <div class="actions">
        <a-space>
          <a-button>
            重置
          </a-button>
          <a-button :loading="loading" type="primary" @click="onSubmitClick">
            提交
          </a-button>
        </a-space>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import type {FormInstance} from '@arco-design/web-vue/es/form';

const formData = ref({});
const formRef = ref<FormInstance>();

definePageMeta({
  title: '分组表单',
  order: 3,
})

const {loading, setLoading} = useLoading();
const onSubmitClick = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    setLoading(true);
  }
  setTimeout(() => {
    setLoading(false);
  }, 1000);
};
</script>

<script lang="ts">
export default {
  name: 'Group',
};
</script>

<style lang="less" scoped>
.container {
  padding: 0 20px 40px 20px;
  overflow: hidden;
}

.actions {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
  padding: 14px 20px 14px 0;
  background: var(--color-bg-2);
  text-align: right;
}
</style>
