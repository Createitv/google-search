import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, TrashIcon } from 'lucide-react';
import { CommonWebsite } from '@prisma/client';

type Website = Omit<CommonWebsite, "icon">

export type Product = Omit<CommonWebsite, 'id'>;
export type NewProduct = Omit<Product, 'icon'>;
interface AlertState {
  message: string;
  isError: boolean;
}

const EditableTable: React.FC = () => {
  const [data, setData] = useState<Website[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Website | null>(null);
  const [newRow, setNewRow] = useState<NewProduct>({ name: '', url: "" });
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  async function fetchCommonWebsite() {
    const res = await fetch('/api/common-website', {
      method: 'GET',
    });
    const websiteSettings: Website[] = await res.json()
    console.log("websiteSettings", websiteSettings)
    // @ts-ignore
    setData(websiteSettings['commonWebsite'])
  }

  useEffect(() => {
    fetchCommonWebsite()
  }, [])

  // 处理选择/取消选择
  const toggleSelect = (id: string): void => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // 全选/取消全选
  const toggleSelectAll = (): void => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map(item => item.id)));
    }
  };

  // 删除单条数据 Done
  const handleDelete = async (id: string): Promise<void> => {
    try {
      // 这里应该是您的API调用
      const res = await fetch('/api/common-website', {
        method: 'DELETE',
        body: JSON.stringify([id])
      });
      const deleteRes = await res.json()
      if (deleteRes.status === "ok") {
        setData(prev => prev.filter(item => item.id !== id));
        showAlert("数据已成功删除");
      } else {
        showAlert("删除数据时出错", true);
      }
    } catch (error) {
      showAlert("删除数据时出错", true);
    }
  };

  // 批量删除数据 Done
  const handleBatchDelete = async (): Promise<void> => {
    try {
      if (selectedIds.size === 0) {
        showAlert("请先选择要删除的数据", true);
        return;
      }
      // 这里应该是您的API调用
      const res = await fetch('/api/common-website', {
        method: 'DELETE',
        body: JSON.stringify(Array.from(selectedIds))
      });
      const deleteRes = await res.json()
      if (deleteRes['status'] === "ok") {
        setData(prev => prev.filter(item => !selectedIds.has(item.id)));
        setSelectedIds(new Set());
        showAlert(`成功删除 ${selectedIds.size} 条数据`);
      } else {
        showAlert("批量删除数据时出错", true);
      }
    } catch (error) {
      showAlert("批量删除数据时出错", true);
    }
  };

  // 显示提示信息
  const showAlert = (message: string, isError: boolean = false): void => {
    setAlert({ message, isError });
    setTimeout(() => setAlert(null), 3000);
  };

  // 进入编辑模式
  const startEditing = (id: string): void => {
    const rowToEdit = data.find(item => item.id === id);
    if (rowToEdit) {
      setEditingId(id);
      setEditedData(rowToEdit);
    }
  };

  // 处理编辑中的数据变化
  const handleEditChange = (field: keyof Website, value: string | number): void => {
    if (!editedData) return;

    setEditedData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value
      };
    });
  };

  // 保存编辑的数据
  const saveEdit = async (): Promise<void> => {
    try {
      if (!editedData) return;

      // 这里应该是您的API调用
      const res = await fetch('/api/common-website', {
        method: 'PUT',
        body: JSON.stringify(editedData)
      });
      const deleteRes = await res.json()
      // console.log("editor data", editedData)
      // const deleteRes = {
      //   "status": "ok"
      // }

      setData(prev =>
        prev.map(item =>
          item.id === editingId ? editedData : item
        )
      );
      setEditingId(null);
      setEditedData(null);
      if (deleteRes['status'] === "ok") {
        showAlert(`更新数据成功`);
      } else {
        showAlert("更新数据时出错", true);
      }
    } catch (error) {
      showAlert("更新数据时出错", true);
    }
  };

  // 处理新行数据的变化
  const handleNewRowChange = (field: keyof NewProduct, value: string): void => {
    setNewRow((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  // 添加新行 Done
  const addNewRow = async (): Promise<void> => {
    try {
      if (!newRow.name || !newRow.url) {
        showAlert("请填写有效的数据", true);
        return;
      }
      // 这里应该是您的API调用
      const response = await fetch('/api/common-website', {
        method: 'POST',
        body: JSON.stringify(newRow)
      });
      const addRes = await response.json()

      const newId = Math.max(...data.map((item, idx) => idx)) + 1;
      const newProduct: Website = { ...newRow, id: newId.toLocaleString() };

      setData(prev => [...prev, newProduct]);
      setNewRow({ name: '', url: "" });
      if (addRes.id !== "") {
        showAlert("新数据已成功添加");
      } else {
        showAlert("添加新数据时出错", true);
      }
    } catch (error) {
      showAlert("添加新数据时出错", true);
    }
  };

  // 渲染批量删除按钮 Done
  const renderBatchDeleteButton = () => {
    if (selectedIds.size === 0) return null;

    return (
      <div className="mb-4 flex justify-start items-center">
        <Button
          onClick={handleBatchDelete}
          variant="destructive"
          size="sm"
          className="animate-in fade-in slide-in-from-left-5 duration-300"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          删除选中 ({selectedIds.size})
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full p-4">
      <h1 className='text-3xl font-bold mb-10'>常用网页搜索设置</h1>
      {alert && (
        <Alert className={`mb-4 ${alert.isError ? 'bg-red-100' : 'bg-green-100'}`}>
          <AlertDescription>
            {alert.message}
          </AlertDescription>
        </Alert>
      )}

      {/* 条件渲染批量删除按钮 */}
      {renderBatchDeleteButton()}

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">
                <Checkbox
                  checked={selectedIds.size === data.length && data.length > 0}
                  onClick={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">网页名称</th>
              <th className="px-4 py-2 text-left">网页链接</th>
              <th className="px-4 py-2 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {/* 添加新行的输入框 */}
            <tr className="border-t">
              <td className="px-4 py-2"></td>
              <td className="px-4 py-2">新建</td>
              <td className="px-4 py-2">
                <Input
                  placeholder="请输出网页名称"
                  value={newRow.name}
                  onChange={(e) => handleNewRowChange('name', e.target.value)}
                  className="w-full"
                />
              </td>
              <td className="px-4 py-2">
                <Input
                  placeholder="请输入网页地址"
                  value={newRow.url}
                  onChange={(e) => handleNewRowChange('url', e.target.value)}
                  className="w-full"
                />
              </td>

              <td className="px-4 py-2">
                <Button onClick={addNewRow} size="sm">
                  添加
                </Button>
              </td>
            </tr>
            {data.map((row, idx) => (
              <tr key={row.id} className="border-t">
                <td className="px-4 py-2">
                  <Checkbox
                    checked={selectedIds.has(row.id)}
                    onClick={() => toggleSelect(row.id)}
                  />
                </td>
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">
                  {editingId === row.id ? (
                    <Input
                      value={editedData?.name}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td className="px-4 py-2">
                  {editingId === row.id ? (
                    <Input
                      value={editedData?.url}
                      onChange={(e) => handleEditChange('url', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                      row.url
                  )}
                </td>

                <td className="px-4 py-2">
                  <div className="space-x-2">
                    {editingId === row.id ? (
                      <>
                        <Button onClick={saveEdit} size="sm">
                          保存
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingId(null);
                            setEditedData(null);
                          }}
                          variant="outline"
                          size="sm"
                        >
                          取消
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                            onClick={() => startEditing(row.id)}
                          variant="outline"
                          size="sm"
                        >
                          编辑
                        </Button>
                        <Button
                            onClick={() => handleDelete(row.id)}
                          variant="destructive"
                          size="sm"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditableTable;