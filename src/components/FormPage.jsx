import React, { useCallback } from "react";
import { Button, Form, Select, DatePicker, TimePicker, Input } from "antd";
import dayjs from 'dayjs';
import "../styles/Form.css";

function FormPage() {
  const [form] = Form.useForm();
  const { Option } = Select;
  const format = "HH:mm";
  const { TextArea } = Input;

  const validateMessages = {
    required: "Поле обязательно для заполнения!",
  };

  const floors = [];
  for (let i = 3; i <= 27; i++) {
    floors.push({
      value: i.toString(),
      label: i.toString(),
    });
  }

  const rooms = [];
  for (let i = 1; i <= 10; i++) {
    rooms.push({
      value: i.toString(),
      label: i.toString(),
    });
  }

  const disabledDate = (current) => {
    return current < dayjs().startOf('day');;
  };

  const handleSubmit = (values) => {
    form
      .validateFields()
      .then((values) => console.log(values))
      .catch((error) => console.log(error));
  };
  const handleReset = useCallback(() => {
    form.resetFields();
  }, [form]);

  return (
    <Form
      form={form}
      name="form"
      autoComplete="off"
      validateMessages={validateMessages}
      initialValues={{ remember: true }}
      className="form"
      onFinish={handleSubmit}
    >
      <h2 className="title">Форма бронирования переговорной</h2>
      <Form.Item
        name="tower"
        label="Башня"
        rules={[{ required: true }]}
        className="field_container"
      >
        <Select placeholder="Выберите башню" className="field">
          <Option value="a_tower">A башня</Option>
          <Option value="b_tower">Б башня</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="floor"
        label="Этаж"
        rules={[{ required: true }]}
        className="field_container"
      >
        <Select
          placeholder="Выберите этаж"
          options={floors}
          className="field"
        />
      </Form.Item>
      <Form.Item
        name="room"
        label="Переговорка"
        rules={[{ required: true }]}
        className="field_container"
      >
        <Select
          placeholder="Выберите переговорку"
          options={rooms}
          className="field"
        />
      </Form.Item>
      <Form.Item
        name="date"
        label="Дата"
        rules={[{ required: true }]}
        className="field_container"
      >
        <DatePicker placeholder="Выберите дату" className="field" disabledDate={disabledDate}/>
      </Form.Item>
      <Form.Item
        name="time_interval"
        label="Интервал времени"
        rules={[{ required: true }]}
        className="field_container"
      >
        <TimePicker.RangePicker
          format={format}
          placeholder={["Начало", "Конец"]}
          className="field"
        />
      </Form.Item>
      <Form.Item name="comment" label="Комментарий" className="field_container">
        <TextArea
          className="field"
          style={{
            height: 120,
            resize: "none",
          }}
        />
      </Form.Item>
      <div className="buttons_container">
        <Button type="primary" htmlType="submit" className="button">
          Отправить
        </Button>
        <Button htmlType="button" onClick={handleReset} className="button">
          Очистить
        </Button>
      </div>
    </Form>
  );
}

export default FormPage;

