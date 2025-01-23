import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy } from "lucide-react";

const ViewHTMLDialog = ({ openDialog, htmlCode, closeDialog }) => {
  const copyCode = () => {
    navigator.clipboard.writeText(htmlCode);
  };

  return (
    <div className="">
      <Dialog open={openDialog} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle asChild>
              <div className="flex items-center justify-between p-2">
                <h2>HTML Email Template</h2>
                <Copy
                  className="p-2 bg-gray-100 rounded-lg h-8 w-8 cursor-pointer"
                  onClick={copyCode}
                />
              </div>
            </DialogTitle>
            <DialogDescription asChild>
              <div className="max-h-[400px] overflow-scroll bg-black text-white">
                <pre className="whitespace-pre-wrap break-all">
                  <code>{htmlCode}</code>
                </pre>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewHTMLDialog;
