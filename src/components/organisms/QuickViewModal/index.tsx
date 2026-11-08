"use client";

import { useState } from "react";
import { Modal } from "@/components/molecules/Overlay";
import { ProductGallery } from "@/components/organisms/ProductGallery";
import { ProductInformation } from "@/components/organisms/ProductInformation";
import { useUI } from "@/hooks/useUI";
import { getProductById } from "@/lib/product-utils";

export function QuickViewModal() {
  const { quickViewId, close } = useUI();
  // Keep the last product rendered while the modal fades out.
  const [shownId, setShownId] = useState(quickViewId);
  if (quickViewId && quickViewId !== shownId) setShownId(quickViewId);

  const product = shownId ? getProductById(shownId) : undefined;
  const onClose = () => close("quickView");

  return (
    <Modal
      open={Boolean(quickViewId)}
      onClose={onClose}
      title={product ? `Quick view: ${product.name}` : "Quick view"}
      hideHeader
      size="lg"
    >
      {product && (
        <div key={product.id} className="grid md:grid-cols-2">
          <div className="md:p-8 md:pr-0">
            <ProductGallery images={product.images} productName={product.name} variant="compact" />
          </div>
          <div className="px-6 py-8 md:p-10 md:pt-12">
            <ProductInformation product={product} variant="compact" onAdded={onClose} />
          </div>
        </div>
      )}
    </Modal>
  );
}
