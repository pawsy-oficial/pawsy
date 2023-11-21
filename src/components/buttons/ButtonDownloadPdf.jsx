import { DownloadSimple } from "@phosphor-icons/react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

export default function ButtonDownloadPdf() {
    return (
        <button className="flex cursor-pointer">
			<DownloadSimple size={24}/>
		</button>
    )
}